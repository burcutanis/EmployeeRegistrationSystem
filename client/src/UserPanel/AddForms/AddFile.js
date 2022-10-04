import React, { useState, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import axios from 'axios';



const FileUploadScreen = (props) => {
    const [singleFile, setSingleFile] = useState('');
    const [singleFiles, setSingleFiles] = useState([]);
    const [singleProgress, setSingleProgress] = useState(0);



    useEffect(() => {

        const FetchData = async () => {
            const result = await axios.get('http://localhost:4000/file');
            setSingleFiles(result.data);
            //console.log(singleFiles);
        }
        FetchData();

    }, [singleFiles.value]
    )

    const SingleFileChange = (e) => {
        setSingleFile(e.target.files[0]);
        setSingleProgress(0);
    }

    const singleFileOptions = {
        onUploadProgress: (progressEvent) => {
            const { loaded, total } = progressEvent;
            const percentage = Math.floor(((loaded / 1000) * 100) / (total / 1000));
            setSingleProgress(percentage);
        }
    }

    const singleFileUpload = async (data, options) => {
        try {
            await axios.post('http://localhost:4000/file', data, options);
        } catch (error) {
            throw error;
        }

    }
    const userId = "merhaba";

    const uploadSingleFile = async () => {
        const formData = new FormData();
        formData.append('file', singleFile);
        formData.append('userId', userId);
        await singleFileUpload(formData, singleFileOptions);
        props.getsingle();
    }

    function importAll(r) {
        let images = {};
        r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
        return images;
    }

    const images = importAll(require.context('../../../../server/files', false, /\.(png|jpe?g|svg|pdf)$/));










    return (
        <>
            <div className="row mt-3">
                <div className="col-6">
                    <div className="form-group">
                        <label>Select Single File</label>
                        <input type="file" className="form-control" onChange={(e) => SingleFileChange(e)} />
                    </div>
                    <div className="row">
                        <div className="col-10">
                            <button type="button" className="btn btn-danger" onClick={() => uploadSingleFile()} >Upload</button>
                        </div>
                        <div className="col-2">
                            <CircularProgressbar
                                value={singleProgress}
                                text={`${singleProgress}%`}
                                styles={buildStyles({
                                    rotation: 0.25,
                                    strokeLinecap: 'butt',
                                    textSize: '16px',
                                    pathTransitionDuration: 0.5,
                                    pathColor: `rgba(255, 136, 136, ${singleProgress / 100})`,
                                    textColor: '#f88',
                                    trailColor: '#d6d6d6',
                                    backgroundColor: '#3e98c7',
                                })}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid mt-5">
                <div className="row">
                    <div className="col-6">
                        <h4 className="text-success font-weight-bold">Single Files List</h4>
                        <div className="row">
                            <img src={'../../../../files/result1.png'} height="200" alt="img" />
                            {singleFiles.map((file, index) =>
                                <div className="col-6">
                                    <div className="card mb-2 border-0 p-0">
                                        <img src={images[file.filePath]} height="200" className="card-img-top img-responsive" />


                                    </div>
                                    <div>
                                        <a
                                            href={images[file.filePath]}
                                            download
                                        >
                                            Click to download
                                        </a>
                                    </div>

                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>


        </>
    );
}

export default FileUploadScreen;
