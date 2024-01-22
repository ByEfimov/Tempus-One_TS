import Styles from './Styles.module.scss';
import { Subscription } from 'Api/Users/interaction/subscription';
import { changeRequest } from 'Api/requests/change-request';
import { postRequestWithNewId } from 'Api/requests/post-requests-with-new-id';
import ButtonVoid from 'Components/mini-components/button';
import CustomInput from 'Components/mini-components/input';
import CustomTextarea from 'Components/mini-components/textarea';
import { ErrorNotification } from 'Components/notifications/notifications';
import { useAuth } from 'Hooks/useAuth';
import { handleImageUpload } from 'Utils/handlers/handler-image-upload';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateTeam = () => {
    const { UserCanChanging, UserId, UserIsAuth, UserExperience } = useAuth();
    const navigate = useNavigate();

    const [Title, setTitle] = useState('');
    const [Description, setDescription] = useState('');
    const [ProjectName, setProjectName] = useState('');
    const [ProjectDescription, setProjectDescription] = useState('');
    const [selectImage, setSelectImage] = useState('');

    function createNewTeam() {
        if (
            Title &&
            Description &&
            ProjectName &&
            ProjectDescription &&
            selectImage &&
            UserId
        ) {
            const NewTeam = {
                title: Title,
                desc: Description,
                projectTitle: ProjectName,
                projectDesc: ProjectDescription,
                image: selectImage,
                members: {
                    [UserId]: { UserId: UserId, UserRole: 'Administrator' },
                },
            };
            postRequestWithNewId('teams/', NewTeam).then((teamId) => {
                Subscription('team', teamId, UserId);
                changeRequest(
                    'users/' + UserId,
                    '/experience',
                    UserExperience + 80,
                );
                clearInputs();
                navigate('/');
            });
        } else {
            ErrorNotification('Не все поля заполнены.');
        }
    }
    function clearInputs() {
        setTitle('');
        setDescription('');
        setProjectName('');
        setProjectDescription('');
        setSelectImage('');
    }

    if (UserCanChanging) {
        return (
            <div className={Styles.Container}>
                <h1 className={Styles.title}>Создать команду</h1>

                <form onSubmit={(e) => e.preventDefault()}>
                    <div className={Styles.HeadInputs}>
                        {selectImage ? (
                            <img
                                src={selectImage}
                                alt=""
                                className={Styles.image}
                            />
                        ) : (
                            <input
                                type="file"
                                onChange={(e) =>
                                    handleImageUpload(e, setSelectImage)
                                }
                                className={Styles.image}
                            />
                        )}

                        <div>
                            <CustomInput
                                changeFunction={(e) => setTitle(e.target.value)}
                                placeholder="Название"
                                mode="large"
                                stateValue={Title}
                            ></CustomInput>
                            <CustomInput
                                changeFunction={(e) =>
                                    setDescription(e.target.value)
                                }
                                placeholder="Описание"
                                mode="large"
                                stateValue={Description}
                            ></CustomInput>
                        </div>
                    </div>
                    <div className={Styles.aboutProject}>
                        <CustomInput
                            changeFunction={(e) =>
                                setProjectName(e.target.value)
                            }
                            placeholder="Проект над которым работаете"
                            mode="large"
                            stateValue={ProjectName}
                        ></CustomInput>
                        <CustomTextarea
                            changeFunction={(e) =>
                                setProjectDescription(e.target.value)
                            }
                            placeholder="Дайте описание своему проекту"
                            mode="large"
                            stateValue={ProjectDescription}
                        ></CustomTextarea>
                    </div>
                    <ButtonVoid
                        title="Создать"
                        clickHandler={() => {
                            createNewTeam();
                        }}
                    ></ButtonVoid>
                </form>
            </div>
        );
    } else if (!UserCanChanging) {
        if (!UserIsAuth) {
            ErrorNotification('Нужно войти в аккаунт.');
        } else {
            ErrorNotification('Нужно подтвердить почту.');
        }
    }
};

export default CreateTeam;
