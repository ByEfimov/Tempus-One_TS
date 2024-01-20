import ShowErrorsOrAlert, {
    ModsForShowModal,
} from '../Modals/ShowErrorsOrAlert';
import Styles from '../Styles.module.scss';
import CustomInput from 'Components/mini-components/input';
import ActiveButton from 'Components/show-posts/post-components/active-button';
import ShowCode from 'Components/show-posts/post-components/show-code';
import { useAppDispatch } from 'Hooks/redux-hooks';
import { useWritePost } from 'Hooks/useWritePost';
import {
    changeTextOfBlock,
    changeTitleOfBlock,
} from 'Store/slices/wite-post/write-post-slice';
import { reversBlock } from 'Utils/animations/revers-block';
import { ModsOfInput } from 'Utils/mods-of-comps';
import classNames from 'classnames';
import { useState } from 'react';
import { LiveEditor, LiveProvider } from 'react-live';

const CodeMode = () => {
    const { selectMode, BlocksOfPost } = useWritePost();
    const dispatch = useAppDispatch();

    const UserCode = BlocksOfPost[selectMode.id].text;
    const [isModalClueCodeOpen, setIsModalClueCodeOpen] = useState(false);
    const [isModalErrorsOpen, setIsModalErrorsOpen] = useState(false);

    function changeTitle(e: React.ChangeEvent<HTMLInputElement>) {
        dispatch(
            changeTitleOfBlock({ id: selectMode.id, title: e.target.value }),
        );
    }

    return (
        <>
            {isModalClueCodeOpen && (
                <ShowErrorsOrAlert
                    mode={ModsForShowModal.ClueCode}
                    setIsModalOpen={setIsModalClueCodeOpen}
                ></ShowErrorsOrAlert>
            )}
            {isModalErrorsOpen && (
                <ShowErrorsOrAlert
                    mode={ModsForShowModal.Errors}
                    setIsModalOpen={setIsModalErrorsOpen}
                ></ShowErrorsOrAlert>
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
                    <div>
                        <LiveProvider enableTypeScript={true} code={UserCode}>
                            <LiveEditor
                                className={Styles.LiveEdit}
                                onChange={(e) =>
                                    dispatch(
                                        changeTextOfBlock({
                                            id: selectMode.id,
                                            text: e,
                                        }),
                                    )
                                }
                            />
                        </LiveProvider>
                    </div>
                </div>
                <div className={classNames(Styles.face, Styles.back)}>
                    <h1>
                        <ShowCode UserCode={UserCode} />
                    </h1>
                </div>
            </div>
        </>
    );
};

export default CodeMode;
