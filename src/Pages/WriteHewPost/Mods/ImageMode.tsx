import { ChangeEvent } from 'react';
import { ModsOfInput } from '../../../Utils/ModsOfComps';
import CustomInput from '../../../Components/minicops/input';
import Styles from '../Styles.module.scss';
import classNames from 'classnames';
import ActiveButton from '../../../Components/ShowPosts/postsComp/activeButton';
import ShowImage from '../../../Components/ShowPosts/postsComp/ShowImage';
import { reverceBlock } from '../../../Utils/anims/reverceBlock';
import {
    changeTextOfBlock,
    changeTitleOfBlock,
} from '../../../Store/slices/WritePostSlice';
import { useWritePost } from '../../../Hooks/useWritePost';
import { useAppDispatch } from '../../../Hooks/redus-hooks';

const ImageMode = () => {
    const { selectMode, BlocksOfPost } = useWritePost();
    const dispatch = useAppDispatch();

    function changeTitle(e: React.ChangeEvent<HTMLInputElement>) {
        dispatch(
            changeTitleOfBlock({ id: selectMode.id, title: e.target.value })
        );
    }

    const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        const reader = new FileReader();

        reader.onload = () => {
            console.log(selectMode.type);
            dispatch(
                changeTextOfBlock({
                    id: selectMode.id,
                    text: reader.result as string,
                })
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
                    value={BlocksOfPost[selectMode.id].title || ''}
                    placeholder="Название для картинки"
                    changeFunction={changeTitle}
                    mode={ModsOfInput.small}
                ></CustomInput>
                <div className={Styles.buttons}>
                    <ActiveButton
                        clickHandler={() =>
                            reverceBlock('card', Styles.cardActive)
                        }
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
                        imageSrc={BlocksOfPost[selectMode.id].text}
                    ></ShowImage>
                </div>
            </div>
        </>
    );
};

export default ImageMode;
