import { FC, ChangeEvent } from 'react';
import { ModsOfInput } from '../../../Utils/ModsOfComps';
import CustomInput from '../../../Components/minicops/input';
import Styles from '../Styles.module.scss';
import classNames from 'classnames';
import { UpdateData } from '../../../Utils/UpdatePostData';
import { PostData } from '../WritePost';
import ActiveButton from '../../../Components/ShowPosts/postsComp/activeButton';
import ShowImage from '../../../Components/ShowPosts/postsComp/ShowImage';

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
                    <ActiveButton
                        clickHandler={() => reverceBlock()}
                        Styles={Styles}
                        Class={Styles.swapButton}
                        icon="refresh-ccw"
                    ></ActiveButton>
                </div>
            </div>
            <div className={Styles.card} id="card">
                <div className={classNames(Styles.face, Styles.front)}>
                    <input type="file" onChange={handleImageUpload} />
                </div>
                <div className={classNames(Styles.face, Styles.back)}>
                    <ShowImage
                        imageSrc={AllDataOfPost[SelectMode.id].text}
                    ></ShowImage>
                </div>
            </div>
        </>
    );
};

export default ImageMode;
