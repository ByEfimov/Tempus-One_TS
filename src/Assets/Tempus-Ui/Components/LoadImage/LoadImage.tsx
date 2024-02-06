import Button, { ButtonTypes } from '../Buttons/Button';
import Styles from './LoadImage.module.scss';
import ButtonIcons, {
    buttonIcons,
} from 'Assets/Tempus-Ui/Icons/Buttons/Button-icons';
import FeatherIcon from 'feather-icons-react';
import { useRef, useState } from 'react';
import AvatarEditor from 'react-avatar-editor';
import { useDropzone } from 'react-dropzone';

const LoadImage = ({
    Callback,
    Image,
}: {
    Callback: (value: React.SetStateAction<string>) => void;
    Image: string;
}) => {
    const [image, setImage] = useState<string | null>(null);
    const editorRef = useRef<AvatarEditor | null>(null);
    const [scale, setScale] = useState<number>(1);

    const onDrop = (acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        setImage(URL.createObjectURL(file));
    };

    const handleSave = () => {
        if (editorRef.current) {
            const editedImage = editorRef.current
                .getImageScaledToCanvas()
                .toDataURL();
            Callback(editedImage);
        }
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <div className={Styles.LoadImage}>
            {image && !Image ? (
                <div className={Styles.changeImage}>
                    <div className={Styles.editor}>
                        <AvatarEditor
                            ref={editorRef}
                            image={image}
                            width={200}
                            height={200}
                            borderRadius={200}
                            border={0}
                            scale={scale}
                            style={{ touchAction: 'none' }}
                        />
                    </div>

                    <div className={Styles.Buttons}>
                        <input
                            style={{ touchAction: 'none' }}
                            type="range"
                            min={0.6}
                            max={1.5}
                            step={0.01}
                            value={scale}
                            onChange={(e) => {
                                e.preventDefault();
                                setScale(parseFloat(e.target.value));
                            }}
                        />
                        <Button Click={handleSave} Type={ButtonTypes.icon}>
                            <ButtonIcons Icon={buttonIcons.Sent}></ButtonIcons>
                        </Button>
                    </div>
                </div>
            ) : (
                !Image && (
                    <div {...getRootProps()} className={Styles.Dropzone}>
                        <input {...getInputProps()} />
                        <FeatherIcon
                            icon={'image'}
                            className={Styles.Image}
                        ></FeatherIcon>
                    </div>
                )
            )}
            {Image && <img className={Styles.editedImage} src={Image} alt="" />}
        </div>
    );
};

export default LoadImage;
