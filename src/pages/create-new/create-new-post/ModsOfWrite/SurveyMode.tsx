import Styles from '../Styles.module.scss';
import PlusIcon from 'Assets/Icons/Post/plus-circle.svg';
import TrashIcon from 'Assets/Icons/Post/trash-alt.svg';
import CustomInput from 'Components/mini-components/input';
import { useAppDispatch } from 'Hooks/redux-hooks';
import { useWritePost } from 'Hooks/useWritePost';
import {
    addNewVariantForSurvey,
    changeTitleOfBlock,
    removeVariantForSurvey,
} from 'Store/slices/wite-post/write-post-slice';
import { useState } from 'react';

const SurveyMode = () => {
    const { selectMode, BlocksOfPost } = useWritePost();
    const [newVariant, setNewVariant] = useState('');
    const dispatch = useAppDispatch();

    function changeTitleOfQuestion(e: React.ChangeEvent<HTMLInputElement>) {
        dispatch(
            changeTitleOfBlock({ id: selectMode.id, title: e.target.value }),
        );
    }
    function addNewVariant() {
        if (newVariant) {
            dispatch(
                addNewVariantForSurvey({
                    BlockId: selectMode.id,
                    newVariant,
                    selected: 0,
                }),
            );
            setNewVariant('');
        }
    }
    function removeVariant(e: React.MouseEvent<HTMLDivElement>) {
        dispatch(
            removeVariantForSurvey({
                BlockId: selectMode.id,
                VariantId: e.currentTarget.id,
            }),
        );
    }

    const Variants = BlocksOfPost[selectMode.id].variants;

    return (
        <div className={Styles.Survey}>
            <CustomInput
                placeholder="Ваш вопрос"
                changeFunction={changeTitleOfQuestion}
                mode="small"
            ></CustomInput>
            <div className={Styles.Variants}>
                {Variants?.map((variant) => (
                    <div key={variant.id} className={Styles.Variant}>
                        <div>{variant.text}</div>
                        <div onClick={(e) => removeVariant(e)}>
                            <img
                                id={variant.id?.toString()}
                                src={TrashIcon}
                                alt=""
                            />
                        </div>
                    </div>
                ))}
            </div>

            <div className={Styles.InputVariant}>
                <CustomInput
                    placeholder="Вариант ответа"
                    changeFunction={(e) => setNewVariant(e.target.value)}
                    mode="large"
                    stateValue={newVariant}
                ></CustomInput>
                <div className={Styles.PlusIcon} onClick={addNewVariant}>
                    <img src={PlusIcon} alt="" />
                </div>
            </div>
        </div>
    );
};

export default SurveyMode;
