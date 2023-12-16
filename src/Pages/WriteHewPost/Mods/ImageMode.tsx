import { ModsOfInput } from 'Utils/ModsOfComps';
import CustomInput from 'Components/MiniComponents/input';
import Styles from '../Styles.module.scss';
import classNames from 'classnames';
import ActiveButton from 'Components/ShowPosts/PostsComponents/activeButton';
import ShowImage from 'Components/ShowPosts/PostsComponents/ShowImage';
import { reversBlock } from 'Utils/Animations/reversBlock';
import {
    changeTextOfBlock,
    changeTitleOfBlock,
} from 'Store/slices/WritePost/WritePostSlice';
import { useWritePost } from 'Hooks/useWritePost';
import { useAppDispatch } from 'Hooks/redux-hooks';
import { LoadImage } from 'Api/Posts/Loaders/ImageUpload';

const ImageMode = () => {
    const { selectMode, BlocksOfPost } = useWritePost();
    const dispatch = useAppDispatch();

    function changeTitle(e: React.ChangeEvent<HTMLInputElement>) {
        dispatch(
            changeTitleOfBlock({ id: selectMode.id, title: e.target.value })
        );
    }

    function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
        LoadImage(e.target).then((imageUrl) =>
            dispatch(
                changeTextOfBlock({
                    id: selectMode.id,
                    text: imageUrl,
                })
            )
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
