import Styles from './load-image.module.scss';
import {
    Button,
    ButtonIcons,
    ButtonTypes,
    buttonIcons,
    formItemType,
} from 'Assets/Tempus-Ui';
import { useAuth } from 'Hooks/useAuth';
import classNames from 'classnames';
import FeatherIcon from 'feather-icons-react';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import AvatarEditor from 'react-avatar-editor';
import { useDropzone } from 'react-dropzone';

export enum LoadImageColors {
    Default = 'Default',
    Primary = 'Primary',
}

const LoadImage = ({
    Callback,
    Image,
    Path,
    Colors,
    Variants,
}: {
    Callback: (value: React.SetStateAction<string>) => void;
    Image: string;
    Path: string;
    Colors: LoadImageColors;
    Variants?: formItemType;
}) => {
    const [image, setImage] = useState<string | null>(null);
    const { UserId } = useAuth();
    const editorRef = useRef<AvatarEditor | null>(null);
    const [scale, setScale] = useState<number>(1);
    const storage = getStorage();
    const storageRef = ref(storage, '/' + Path + '/' + UserId);

    const onDrop = (acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        setImage(URL.createObjectURL(file));
    };

    const handleSave = () => {
        if (editorRef.current) {
            const editedImage = editorRef.current
                .getImageScaledToCanvas()
                .toDataURL();

            fetch(editedImage)
                .then((res) => res.blob())
                .then((blob) => {
                    uploadBytes(storageRef, blob).then((snapshot) => {
                        const downloadURL = `https://firebasestorage.googleapis.com/v0/b/${
                            snapshot.ref.bucket
                        }/o/${encodeURIComponent(
                            snapshot.ref.fullPath,
                        )}?alt=media`;

                        Callback(downloadURL);
                    });
                });
        }
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <motion.div
            variants={Variants}
            className={classNames(
                Styles.LoadImage,
                Colors === LoadImageColors.Default && Styles.Default,
            )}
        >
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
        </motion.div>
    );
};

export default LoadImage;
