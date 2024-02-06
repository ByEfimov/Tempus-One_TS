import Styles from './Styles.module.scss';
import { changeRequest } from 'Api/requests/change-request';
import { postRequestWithNewId } from 'Api/requests/post-requests-with-new-id';
import Button, {
    ButtonTypes,
} from 'Assets/Tempus-Ui/Components/Buttons/Button';
import HeaderIcons, {
    headerIcons,
} from 'Assets/Tempus-Ui/Icons/Header/Header-Icons';
import CustomInput from 'Components/mini-components/input';
import CustomTextarea from 'Components/mini-components/textarea';
import { ErrorNotification } from 'Components/notifications/notifications';
import { useAppDispatch } from 'Hooks/redux-hooks';
import { useAuth } from 'Hooks/useAuth';
import { setExecuteButton } from 'Store/slices/header/header-slice';
import { handleImageUpload } from 'Utils/handlers/handler-image-upload';
import AppRoutes from 'Utils/routes/app-routes';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateTeam = () => {
    const { UserCanChanging, UserId, UserIsAuth, UserExperience } = useAuth();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [Title, setTitle] = useState('');
    const [Description, setDescription] = useState('');
    const [ProjectName, setProjectName] = useState('');
    const [ProjectDescription, setProjectDescription] = useState('');
    const [selectImage, setSelectImage] = useState('');

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

    useEffect(() => {
        function createNewTeam() {
            postRequestWithNewId('teams/', NewTeam).then(() => {
                changeRequest(
                    'users/' + UserId,
                    '/experience',
                    UserExperience + 80,
                );
                clearInputs();
                navigate(AppRoutes.TEAMS);
            });
        }
        dispatch(
            setExecuteButton({
                button: {
                    icon: '',
                    component: (
                        <Button Click={createNewTeam} Type={ButtonTypes.icon}>
                            <HeaderIcons Icon={headerIcons.Add} />
                        </Button>
                    ),
                },
            }),
        );
    }, [NewTeam]);

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
