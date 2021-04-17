import { Container } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import  {pdfjs, Document, Page } from 'react-pdf';
import InfiniteScroll from 'react-infinite-scroll-component'
import VisibilitySensor from 'react-visibility-sensor'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const Viewer = (props)=>{
    const initItems = new Array(2)
    initItems.fill((props)=><Page 
    pageIndex={0}
/>)

    const [items, setItems] = useState(initItems)

    const callNext = ()=>{
        const newItems =  new Array(10)
        newItems.fill((props)=><Page 
        pageIndex={0}
    />)
        
        const xItems = [...items, ...newItems]
        setItems(xItems)
    }

    return (
        <div>
            <Container>
                <Document
                    file={props.fileLink}
                    onLoadSuccess={()=>{console.log('loaded')}}
                    onLoadError={(e)=>{console.log(e)}}
                >
                   <InfiniteScroll
                        dataLength={items.length}
                        next={callNext}
                        hasMore={true}
                        loader={<div>Loding...</div>}
                   >
                        {items.map((Item, i)=>(
                            <VisibilitySensor
                                key={i}
                                onChange={(isVisible)=>{
                                    console.log('visible',i)
                                }}
                            >
                                <Item />
                            </VisibilitySensor>
                        ))}
                   </InfiniteScroll>
                </Document>
            </Container>
        </div>
    )
}

export default Viewer