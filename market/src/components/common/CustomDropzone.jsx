import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import img from "../../assets/img/not-image.jpg";

const BASE_URL = "http://127.0.0.1:8000";

const CustomDropzone = ({ image, fnc, disabled }) => {
    const [preview, setPreview] = useState('');
    const { getRootProps, getInputProps, open, acceptedFiles } = useDropzone({
        noClick: true,
        onDrop: (acceptedFiles) => {
            const file = acceptedFiles[0];
            const reader = new FileReader();

            reader.onloadend = () => {
                setPreview(reader.result);
            };

            if (file) {
                reader.readAsDataURL(file);
            }
        }
    });

    const files = acceptedFiles.map(file => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ));

    useEffect(() => {
        fnc(acceptedFiles[0]);
    }, [acceptedFiles])

    useEffect(() => {
        if (image && image !== "") {
            setPreview(BASE_URL + image);
        } else {
            setPreview(img);
        }
    }, [image]);

    return (
        <div className="flex flex-col border border-gray-400 px-3 py-5 rounded shadow-md">
            <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here</p>
                <button disabled={disabled} className="border border-gray-700 px-3 py-1 m-2 bg-blue-100 rounded shadow-md" type="button" onClick={open}>
                    Open File Dialog
                </button>
            </div>
            <aside className="flex-col">
                <h4 className="m-2 font-bold">Files</h4>
                <img name="photo" className="h-40 w-44 border border-grey-lighter rounded-md py-3 px-4 m-2" id="image-product" src={preview} alt="Not Image" />
            </aside>
        </div>
    );
}

export default CustomDropzone;