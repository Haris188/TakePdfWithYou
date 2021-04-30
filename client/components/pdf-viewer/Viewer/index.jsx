import { Container, Paper } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import  {pdfjs, Document, Page } from 'react-pdf';
import InfiniteScroll from 'react-infinite-scroll-component'
import VisibilitySensor from 'react-visibility-sensor'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux';
import {
    scrollIntoView,
    itemsSelector,
    setItems,
    setPageThreshold,
    gotoSelector,
    setNumPages,
    numPagesSelector
} from '../pdfViewerSlice'
import $ from 'jquery'
import {sendSaveBookmarkReq} from '../../../api'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const CenterDiv = styled.div`
    width: max-content;
    margin: 0 auto;
    padding: 1em;
`
const ContainerDiv = styled.div`
    width: 100%;
    padding-top: 4em;
`

export const createPageElemFor = (pageIndex)=>{
    return (props)=>(
        <Paper style={{marginTop:'1em'}} variant="outlined" elevation={2}>
            <Page pageIndex={pageIndex} />
        </Paper>
    )
}

const Viewer = (props)=>{
    const items = useSelector(itemsSelector)
    const gotoPage = useSelector(gotoSelector)
    const totalPages = useSelector(numPagesSelector)
    const dispatch = useDispatch()
    const router = useRouter()
    const [lastPage, setLastPage] = useState(props.bookmark)


    useEffect(async ()=>{
        dispatch(setItems([]))
        const doc = await pdfjs.getDocument(props.fileLink)
        .promise

        dispatch(setNumPages(doc.numPages))
        dispatch(scrollIntoView(props.bookmark))
    },[])

    useEffect(()=>{
            let exec = false
            let done = true

            const inter = setInterval(async () => {
                if(exec)
                await saveBookmarkToServer()
                exec = !exec
                done= !done
                if(done)
                clearInterval(inter)
            }, 1000);
    }, [lastPage])

    useEffect(()=>{
        var checkExist = setInterval(function() {
            if ($(`#page-${gotoPage}`).length) {
               const el = document.getElementById(`page-${gotoPage}`)
               el.scrollIntoView()
               clearInterval(checkExist);
            }
         }, 100);
    }, [gotoPage])

    const saveBookmarkToServer = async()=>{

        const newRead = Math.ceil(parseInt(lastPage)/totalPages * 100)
        if(newRead && parseInt(newRead) < parseInt(totalPages)){
            const data = {
                pdfId: props.fileId.toString(),
                bookmark: lastPage.toString(),
                read: newRead.toString()
            }

            await sendSaveBookmarkReq(data)
        }
    }

    const callNext = ()=>{
        dispatch(setPageThreshold(items.length+5))
    }

    const observer= new IntersectionObserver((entries)=>{
        const found = entries.find((val=>{
            return val.isIntersecting
        }))

        if(found)
            setLastPage(found.target.id.split('-')[1])
    },{threshold: 0.5})

    return (
        <ContainerDiv>
            <Container>
                <CenterDiv>
                    <Document
                        file={props.fileLink}
                        onLoadError={(e)=>{console.log(e)}}
                    >
                    <InfiniteScroll
                            dataLength={items.length}
                            next={callNext}
                            hasMore={items.length < totalPages}
                            loader={<div>Loding...</div>}
                    >
                            {items.map((Item, i)=>(
                                <div key={i} ref={ref=>{if(ref) observer.observe(ref)}} id={`page-${i}`}>
                                    <Item />
                                </div>
                            ))}
                    </InfiniteScroll>
                    </Document>
                </CenterDiv>
            </Container>
        </ContainerDiv>
    )
}

export default Viewer