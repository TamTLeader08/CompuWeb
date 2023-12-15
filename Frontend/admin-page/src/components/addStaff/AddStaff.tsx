import { GridColDef } from "@mui/x-data-grid";
import "./addstaff.scss"
import React, { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MenuItem, Select, ThemeProvider, createTheme } from "@mui/material";

type Props = {
    slug: string;
    columns: GridColDef[];
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const theme = createTheme({
    palette: {
        background: {
            paper: '#2a3447',
        },
        text: {
            primary: '#fff',
            secondary: "#ddd",
        },
        mode: "dark"
    }
});

export const ImageUpload = () => {
    const [selectedFile, setSelectedFile] = useState();
    const [preview, setPreview] = useState();

    // create a preview as a side effect, whenever the selected file is changed
    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined);
            return;
        }

        const objectUrl = URL.createObjectURL(selectedFile);

        // Resize the image before setting the preview
        resizeImage(selectedFile, 256, 256, (resizedImage) => {
            setPreview(URL.createObjectURL(resizedImage));
        });

        // free memory when this component is unmounted
        return () => URL.revokeObjectURL(objectUrl);
    }, [selectedFile]);

    const onSelectFile = (e) => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined);
            return;
        }

        // Use the first image instead of multiple
        setSelectedFile(e.target.files[0]);
    };

    const resizeImage = (file: File, maxWidth: number, maxHeight: number, callback) => {
        const img = new Image();

        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            let width = img.width;
            let height = img.height;

            // Calculate the new dimensions while maintaining the aspect ratio
            if (width > height) {
                if (width > maxWidth) {
                    height *= maxWidth / width;
                    width = maxWidth;
                }
            } else {
                if (height > maxHeight) {
                    width *= maxHeight / height;
                    height = maxHeight;
                }
            }

            canvas.width = width;
            canvas.height = height;

            // Draw the image on the canvas with the new dimensions
            ctx.drawImage(img, 0, 0, width, height);

            // Convert the canvas to a Blob and pass it to the callback
            canvas.toBlob((blob) => {
                callback(blob);
            }, file.type);
        };

        // Load the image source
        img.src = URL.createObjectURL(file);
    };

    return (
        <div className="image-upload">
            <input type="file" onChange={onSelectFile} />
            {selectedFile && (
                <div className="preview-container">
                    <img src={preview} alt="Preview" />
                    
                </div>
            )}
        </div>
    );
};

const AddStaff = (props: Props) => {

    const [Jvalue, setJValue] = React.useState<Dayjs | null>(dayjs('2023-11-27'));
    const [DoBvalue, setDoBValue] = React.useState<Dayjs | null>(dayjs('2023-11-27'));

    const [genderValue, setGenderValue] = useState('');
    const [validation, setValidation] = useState<Record<string, boolean>>({});
    
    const handleValidation = () => {
        const newValidation: Record<string, boolean> = {};

        props.columns
        .forEach((column) => {
            if (column.field === 'JoinDate' || column.field === 'Birthday') {
                return;
            } 
                
            const inputValue = document.querySelector(`input[name="${column.field}"], select[name="${column.field}"]`)?.value || '';
            if (column.field === 'Gender') {
                newValidation[column.field] = genderValue.trim() !== '';
            } 
            else  newValidation[column.field] = inputValue.trim() !== '';
        });
        
        setValidation(newValidation);
        
        return Object.values(newValidation).every((valid) => valid);
    };
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
 

        const isValid = handleValidation();
        //add new item
        // axios.post('/api/${slug}s')
        if (isValid) {
            //debug
            const formData: Record<string, any> = {};

            props.columns
                .forEach((column) => {
                if (column.field === 'JoinDate') {
                    formData[column.field] = Jvalue?.format('YYYY-MM-DD') || null;
                } else if (column.field === 'Birthday') {
                    formData[column.field] = DoBvalue?.format('YYYY-MM-DD') || null;
                } else if (column.field === 'Gender') {
                    formData[column.field] = genderValue;
                } else {
                    const inputElement = document.querySelector(`input[name="${column.field}"], select[name="${column.field}"]`) as HTMLInputElement;
                    formData[column.field] = inputElement?.value || null;
                }
                });

            console.log('Form Data:', formData);
            //end debug

            // Perform your form submission logic
            // axios.post('/api/${slug}s')
            props.setOpen(false);
          }
          else {
            console.error('Form validation failed');
          }
    };

    return (
        <ThemeProvider theme={theme}>

            <LocalizationProvider dateAdapter={AdapterDayjs}>

                <div className="addstaff">
                    <div className="modal">
                        <span className="close" onClick={() => props.setOpen(false)}>
                            X
                        </span>
                        <h1>Add new {props.slug}</h1>
                        <form onSubmit={handleSubmit}>
                            {props.columns
                                .filter((item) => item.field !== "id" && item.field !== "img")
                                .map((column) => (
                                    <div className={`item ${validation[column.field] === false ? 'invalid' : ''}`} key={column.field}>
                                        <label>{column.headerName}</label>
                                        {/* Use DatePicker for the "Join Date" column */}
                                        {column.field === 'JoinDate' && (
                                            <DatePicker
                                                value={Jvalue}
                                                onChange={(newValue) => setJValue(newValue)}
                                            />
                                        )}
                                        {column.field === 'Birthday' && (
                                            <DatePicker
                                                value={DoBvalue}
                                                onChange={(newValue) => setDoBValue(newValue)}
                                            />
                                        )}
                                        {column.field === 'Gender' && (
                                            <Select
                                            value={genderValue}
                                            onChange={(event) => setGenderValue(event.target.value as string)}
                                            sx={{ width: '100%', height: '40px' }}
                                            >
                                            <MenuItem value="Male">Male</MenuItem>
                                            <MenuItem value="Female">Female</MenuItem>
                                            <MenuItem value="Nonbinary">Nonbinary</MenuItem>
                                            </Select>
                                        )}
                                        {column.field !== 'JoinDate' && column.field !== 'Birthday' &&
                                            column.field !== 'Gender' && (
                                            <input type={column.type} placeholder={column.field} name={column.field} />
                                        )}
                                    </div>
                                ))}
                            <div className="item image-upload">{/* image button */}
                                <label>Upload an Image</label>
                                <ImageUpload />
                            </div>
                            <button type="submit">Send</button>
                        </form>
                    </div>
                </div>
            </LocalizationProvider>
        </ThemeProvider>
    )
}

export default AddStaff