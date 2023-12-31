import Styles from '../Styles.module.scss';
import { LoadImage } from 'Api/Posts/Loaders/ImageUpload';
import CustomInput from 'Components/MiniComponents/input';
import ShowImage from 'Components/ShowPosts/PostComponents/ShowImage';
import ActiveButton from 'Components/ShowPosts/PostComponents/activeButton';
import { useAppDispatch } from 'Hooks/redux-hooks';
import { useWritePost } from 'Hooks/useWritePost';
import {
    changeTextOfBlock,
    changeTitleOfBlock,
} from 'Store/slices/WritePost/WritePostSlice';
import { reversBlock } from 'Utils/Animations/reversBlock';
import { ModsOfInput } from 'Utils/ModsOfComps';
import classNames from 'classnames';

const ImageMode = () => {
    const { selectMode, BlocksOfPost } = useWritePost();
    const dispatch = useAppDispatch();

    function changeTitle(e: React.ChangeEvent<HTMLInputElement>) {
        dispatch(
            changeTitleOfBlock({ id: selectMode.id, title: e.target.value }),
        );
    }

    function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
        LoadImage(e.target).then((imageUrl) =>
            dispatch(
                changeTextOfBlock({
                    id: selectMode.id,
                    text: imageUrl,
                }),
            ),
        );
    }

    return (
        <>
            <div className={Styles.topBlock} id="topBlock">
                <CustomInput
                    placeholder="Название для картинки"
                    changeFunction={changeTitle}
                    mode={ModsOfInput.small}
                ></CustomInput>
                <div className={Styles.buttons}>
                    <ActiveButton
                        clickHandler={() =>
                            reversBlock('card', Styles.cardActive)
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
