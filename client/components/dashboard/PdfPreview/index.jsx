import { CircularProgress, Container as MaterialContainer} from '@material-ui/core'
import {Add as AddIcon} from '@material-ui/icons'
import Flex from '../../Flex'
import React from 'react'
import styled from 'styled-components'

const mockData = [
    {
        id: '1',
        name: 'Java for Dummies',
        thumb: 'https://images-na.ssl-images-amazon.com/images/I/51KmqPgtZnL._SX258_BO1,204,203,200_.jpg',
        downloadLink: 'https://firebasestorage.googleapis.com/v0/b/take-pdf-with-you.appspot.com/o/1%2FResume.pdf?alt=media&token=bd2fd8af-f1f1-4bec-a185-905901d60d22',
        bookmark: '3',
        read: '34'
    },
    {
        id: '3',
        name: 'Java for Dummies',
        thumb: 'https://images-na.ssl-images-amazon.com/images/I/51KmqPgtZnL._SX258_BO1,204,203,200_.jpg',
        downloadLink: 'https://firebasestorage.googleapis.com/v0/b/take-pdf-with-you.appspot.com/o/1%2FResume.pdf?alt=media&token=bd2fd8af-f1f1-4bec-a185-905901d60d22',
        bookmark: '3',
        read: '34'
    },
    {
        id: '4',
        name: 'Java for Dummies',
        thumb: 'https://images-na.ssl-images-amazon.com/images/I/51KmqPgtZnL._SX258_BO1,204,203,200_.jpg',
        downloadLink: 'https://firebasestorage.googleapis.com/v0/b/take-pdf-with-you.appspot.com/o/1%2FResume.pdf?alt=media&token=bd2fd8af-f1f1-4bec-a185-905901d60d22',
        bookmark: '3',
        read: '34'
    },
    {
        id: '5',
        name: 'Java for Dummies',
        thumb: 'https://images-na.ssl-images-amazon.com/images/I/51KmqPgtZnL._SX258_BO1,204,203,200_.jpg',
        downloadLink: 'https://firebasestorage.googleapis.com/v0/b/take-pdf-with-you.appspot.com/o/1%2FResume.pdf?alt=media&token=bd2fd8af-f1f1-4bec-a185-905901d60d22',
        bookmark: '3',
        read: '34'
    },
    {
        id: '6',
        name: 'Java for Dummies',
        thumb: 'https://images-na.ssl-images-amazon.com/images/I/51KmqPgtZnL._SX258_BO1,204,203,200_.jpg',
        downloadLink: 'https://firebasestorage.googleapis.com/v0/b/take-pdf-with-you.appspot.com/o/1%2FResume.pdf?alt=media&token=bd2fd8af-f1f1-4bec-a185-905901d60d22',
        bookmark: '3',
        read: '34'
    },
    {
        id: '7',
        name: 'Java for Dummies',
        thumb: 'https://images-na.ssl-images-amazon.com/images/I/51KmqPgtZnL._SX258_BO1,204,203,200_.jpg',
        downloadLink: 'https://firebasestorage.googleapis.com/v0/b/take-pdf-with-you.appspot.com/o/1%2FResume.pdf?alt=media&token=bd2fd8af-f1f1-4bec-a185-905901d60d22',
        bookmark: '8',
        read: '34'
    },
    {
        id: '8',
        name: 'Java for Dummies',
        thumb: 'https://images-na.ssl-images-amazon.com/images/I/51KmqPgtZnL._SX258_BO1,204,203,200_.jpg',
        downloadLink: 'https://firebasestorage.googleapis.com/v0/b/take-pdf-with-you.appspot.com/o/1%2FResume.pdf?alt=media&token=bd2fd8af-f1f1-4bec-a185-905901d60d22',
        bookmark: '3',
        read: '34'
    },
]

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

const PdfThumbnail = ({pdf})=>{
    return (
        <DashTile 
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
        <ContainerDiv>
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

const OpenFileTile = ()=>{
    return (
        <DashTile 
            title='Open a PDF'
            subtitle="Click this tile to upload a pdf"
            body = {AddButton}
        />
    )
}

const PdfPreviews = ()=>{
    const pdfs = mockData

    return (
        <Container>
            {pdfs
                ? <div>
                    <OpenFileTile />
                    {pdfs.map(pdf=>
                        <PdfThumbnail pdf={pdf} />
                    )}
                </div>
                : <Flex.OriginCenter>
                    <CircularProgress />
                </Flex.OriginCenter>
            }
        </Container>
    )
}

export default PdfPreviews