import React,{useState,useRef } from 'react'
import QRCode from "react-qr-code";
import * as htmlToImage from "html-to-image";


const QrCodeGenerator = () => {

    const [url, setUrl] = useState('')
    const [qrIsVisible, setQrIsVisible] = useState(false);

    const handleQrCodeGenerator = () => {
        if(!url){
            return  //if Url is not getting then Return 
        }
        setQrIsVisible(true)
    }

    const qrCodeRef = useRef(null);

    const downloadQRCode = () => {
        htmlToImage
          .toPng(qrCodeRef.current)
          .then(function (dataUrl) {
            const link = document.createElement("a");
            link.href = dataUrl;
            link.download = "qr-code.png";
            link.click();
          })
          .catch(function (error) {
            console.error("Error generating QR code:", error);
          });
    };

    return (
        <div className='qrcode__container'>
            <h1>QR Code Generator</h1>
            <div className='qrcode__container--parent'>
                <div className='qrcode__input'>
                    <input 
                        type='text'
                        placeholder='Enter a Url'
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                    />
                    <button onClick={handleQrCodeGenerator}>Generate QR Code </button> 
                </div>

                {qrIsVisible && (
                    <div className="qrcode__download" ref={qrCodeRef}>
                        <div className="qrcode__image">
                        <QRCode value={url} size={300} key={url} />
                        </div>
                        <button onClick={downloadQRCode}>Download QR Code</button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default QrCodeGenerator