import { FC, ChangeEvent } from 'react';
import { ModsOfInput } from '../../../Utils/ModsOfComps';
import CustomInput from '../../../Components/minicops/input';
import Styles from '../Styles.module.css';
import FeatherIcon from 'feather-icons-react';
import classNames from 'classnames';
import { UpdateData } from '../../../Utils/UpdatePostData';
import { PostData } from '../WritePost';

interface ModsProps {
    AllDataOfPost: Array<{
        id: number;
        type: string;
        text: string;
        title?: string;
    }>;
    SelectMode: { type: string; id: number };
    setAllDataForPost: React.Dispatch<React.SetStateAction<PostData>>;
}

const ImageMode: FC<ModsProps> = ({
    AllDataOfPost,
    SelectMode,
    setAllDataForPost,
}) => {
    function reverceBlock() {
        document.getElementById('card')?.classList.toggle(Styles.cardActive);
    }
    function changeTitle(e: React.ChangeEvent<HTMLInputElement>) {
        UpdateData(setAllDataForPost, SelectMode, AllDataOfPost, 'title', e);
    }

    const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        const reader = new FileReader();

        reader.onload = () => {
            UpdateData(
                setAllDataForPost,
                SelectMode,
                AllDataOfPost,
                'text',
                undefined,
                reader.result as string
            );
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    return (
        <>
            <div className={Styles.topBlock} id="topBlock">
                <CustomInput
                    value={AllDataOfPost[SelectMode.id].title || ''}
                    placeholder="Название для картинки"
                    changeFunction={changeTitle}
                    mode={ModsOfInput.small}
                ></CustomInput>
                <div className={Styles.buttons}>
                    <button
                        onClick={reverceBlock}
                        className={Styles.swapButton}
                    >
                        <FeatherIcon
                            icon="refresh-ccw"
                            className={Styles.Img}
                        />
                    </button>
                </div>
            </div>
            <div className={Styles.card} id="card">
                <div className={classNames(Styles.face, Styles.front)}>
                    <input type="file" onChange={handleImageUpload} />
                </div>
                <div className={classNames(Styles.face, Styles.back)}>
                    {AllDataOfPost[SelectMode.id].text && (
                        <img src={AllDataOfPost[SelectMode.id].text} alt="" />
                    )}
                </div>
            </div>
        </>
    );
};

export default ImageMode;
