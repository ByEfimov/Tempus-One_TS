/* eslint-disable react-hooks/exhaustive-deps */
import CustomInput from '../../../Components/minicops/input';
import { ModsOfInput } from '../../../Utils/ModsOfComps';
import { useEffect, useState } from 'react';
import Styles from '../Styles.module.scss';
import classNames from 'classnames';
import { LiveProvider, LiveEditor } from 'react-live';
import ShowModal, { ModsForShowModal } from '../Modals/ShowModal';
import ActiveButton from '../../../Components/ShowPosts/postsComp/activeButton';
import ShowCode from '../../../Components/ShowPosts/postsComp/ShowCode';
import { reverceBlock } from '../../../Utils/anims/reverceBlock';
import { useWritePost } from '../../../Hooks/useWritePost';
import { useAppDispatch } from '../../../Hooks/redus-hooks';
import {
    changeTextOfBlock,
    changeTitleOfBlock,
} from '../../../Store/slices/WritePost/WritePostSlice';

const CodeMode = () => {
    const { selectMode, BlocksOfPost } = useWritePost();
    const dispatch = useAppDispatch();

    const [UserCode, setUserCode] = useState(BlocksOfPost[selectMode.id].text);
    const [isModalClueCodeOpen, setIsModalClueCodeOpen] = useState(false);
    const [isModalErrorsOpen, setIsModalErrorsOpen] = useState(false);

    useEffect(() => {
        dispatch(changeTextOfBlock({ id: selectMode.id, text: UserCode }));
    }, [UserCode]);

    function changeTitle(e: React.ChangeEvent<HTMLInputElement>) {
        dispatch(
            changeTitleOfBlock({ id: selectMode.id, title: e.target.value })
        );
    }

    return (
        <>
            {isModalClueCodeOpen && (
                <ShowModal
                    mode={ModsForShowModal.ClueCode}
                    setIsModalOpen={setIsModalClueCodeOpen}
                ></ShowModal>
            )}
            {isModalErrorsOpen && (
                <ShowModal
                    mode={ModsForShowModal.Errors}
                    setIsModalOpen={setIsModalErrorsOpen}
                ></ShowModal>
            )}

            <div className={Styles.topBlock} id="topBlock">
                <CustomInput
                    mode={ModsOfInput.small}
                    placeholder="Название для кода"
                    changeFunction={changeTitle}
                ></CustomInput>
                <div className={Styles.buttons}>
                    <ActiveButton
                        clickHandler={() => setIsModalErrorsOpen(true)}
                        Styles={Styles}
                        Class={Styles.alertButton}
                        icon="alert-triangle"
                    ></ActiveButton>
                    <ActiveButton
                        clickHandler={() => setIsModalClueCodeOpen(true)}
                        Styles={Styles}
                        Class={Styles.helpButton}
                        icon="help-circle"
                    ></ActiveButton>
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
                    <div>
                        <LiveProvider enableTypeScript={true} code={UserCode}>
                            <LiveEditor
                                className={Styles.LiveEdit}
                                onChange={(e) => setUserCode(e)}
                            />
                        </LiveProvider>
                    </div>
                </div>
                <div className={classNames(Styles.face, Styles.back)}>
                    <h1>
                        {UserCode ? (
                            <div>
                                <ShowCode UserCode={UserCode} />
                            </div>
                        ) : (
                            'Здесь будет результат.'
                        )}
                    </h1>
                </div>
            </div>
        </>
    );
};

export default CodeMode;
