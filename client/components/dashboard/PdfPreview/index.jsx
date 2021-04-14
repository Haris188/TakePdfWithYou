import { 
    CircularProgress, 
    Container as MaterialContainer,
    Snackbar,
    Alert
} from '@material-ui/core'
import {Add as AddIcon} from '@material-ui/icons'
import Flex from '../../Flex'
import React, { useEffect } from 'react'
import styled from 'styled-components'
import {useDispatch, useSelector} from 'react-redux'
import {
    pdfsSelector,
    getPdfs,
    loadingSelector,
    errSelector,
    uploadFile,
    uploadErrorSelector,
    setUploadError
} from '../dashboardSlice'
import { useRouter } from 'next/router'



const ContainerDiv = styled.div`
    margin-top: 2em;
    width: 100%;
    border-radius: 10px;
    overflow:hidden;
    box-shadow: 0px 0px 4px rgba(0,0,0,0.1);
    cursor: pointer;
    margin-right: 1em;
    transition: box-shadow 0.1s ease-in;
    :hover {
        box-shadow: 0px 0px 10px rgba(0,0,0,0.1);
    }
    @media only screen and (min-width:550px){
        max-width: 15em;
    }
`
const BodyDiv = styled.div`
    height: 12em;
    overflow:hidden;
    display:flex;
    justify-content:center;
    background: #F6F6F6
`
const PdfImg = styled.img`
    max-height: 100%;
    max-width: 100%;

`
const TitleDiv = styled.div`
    padding: 1em;
`
const H3 = styled.h3``
const P = styled.p``
const Add = styled(AddIcon)`
    && {
        font-size: 8em;
        color: #D9D9D9
    }
`
const Container = styled(MaterialContainer)`
    && {
        @media only screen and (min-width:550px){
            display:flex;
            justify-content: space-evenly; 
            flex-wrap: wrap;
        }
    }
`
const ErrorP = styled.p`
    
`

const PdfThumbnail = ({pdf})=>{
    const router = useRouter()

    const navigateToPdfViewer = ()=>{
        router.push({
            pathname: '/pdf-viewer',
            query: { fileLink: pdf.downloadLink}
        },'pdf-viewer')
    }

    return (
        <DashTile 
            onClick = {navigateToPdfViewer}
            title={pdf.name}
            subtitle={`${pdf.read}% read`}
            body = {pdf.thumb}
        />
    )
}

const AddButton = ()=>(
    <Flex.OriginCenter>
        <Add />
    </Flex.OriginCenter>
)

const DashTile = (props)=>{
    return (
        <ContainerDiv onClick={props.onClick}>
            <BodyDiv>
                {typeof props.body ==="string"
                    ? <PdfImg src={props.body}/>
                    : <props.body />
                }
            </BodyDiv>
            <TitleDiv>
                <H3>{props.title}</H3>
                <P>{props.subtitle}</P>
            </TitleDiv>
        </ContainerDiv>
    )
}

const ErrorMessage = ()=>(
    <Flex.OriginCenter>
        <ErrorP>Failed to fetch your pdfs. Make sure you are connected to the internet</ErrorP>
    </Flex.OriginCenter>
)

const OpenFileTile = (props)=>{
    const triggerFileUpload = ()=>{
        const fileInput = document.createElement('input')
        fileInput.id = 'file-input'
        fileInput.type = 'file'
        fileInput.style.display = "none"

        fileInput.onchange = (e)=>{
            const formData = new FormData()
            formData.append('file', e.target.files[0])
            props.onChoose(formData)
        }

        fileInput.click()
    }

    return (
        <DashTile 
            onClick = {triggerFileUpload}
            title='Open a PDF'
            subtitle="Click this tile to upload a pdf"
            body = {AddButton}
        />
    )
}

const PdfPreviews = ()=>{
    const pdfs = useSelector(pdfsSelector)
    const err = useSelector(errSelector)
    const loading = useSelector(loadingSelector)
    const fileErr = useSelector(uploadErrorSelector)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getPdfs())
    },[])

    return (
        <Container id="dash-container">
            <Snackbar 
                open={fileErr} 
                autoHideDuration={6000} 
                message="Failed to upload Pdf. Can't connect to server"
                onClose={()=>dispatch(setUploadError(false))}
            />  

            {loading
                ? <Flex.OriginCenter>
                        <CircularProgress />
                </Flex.OriginCenter>
                : err
                    ? <ErrorMessage />
                    : <>
                        <OpenFileTile 
                            onChoose={file=>dispatch(uploadFile(file))}
                        />
                        {pdfs.map(pdf=>
                            <PdfThumbnail key={pdf.id} pdf={pdf} />
                        )}
                    </>
            }
        </Container>
    )
}

export default PdfPreviews