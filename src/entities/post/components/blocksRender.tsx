import Styles from '../styles.module.scss';
import { ButtonIcons, buttonIcons } from '@/app/assets/Tempus-Ui';
import { useAuth } from '@/app/hooks/useAuth';
import { blockType, blockTypes, blocksType } from '@/app/slices/witePost/writePostSlice';
import { postRequestWithoutNewId } from '@/features/api/requests/post-requests-with-new-id';
import { NOTIFI_TEXTS } from '@/shared/notifyTexts/notifyTexts';
import { useState } from 'react';
import { LivePreview, LiveProvider } from 'react-live';
import { toast } from 'react-toastify';
import 'swiper/css';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

interface BlocksRender {
  Blocks: blocksType;
  postId: string | undefined;
  inView: boolean;
}

const BlocksRender = ({ Blocks, postId, inView }: BlocksRender) => {
  return (
    Blocks && (
      <div className={Styles.BlocksData}>
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          pagination={{
            type: 'fraction',
          }}
          modules={[Pagination]}
        >
          {Blocks.map((block) => {
            if (
              block?.type === blockTypes.Code ||
              block?.type === blockTypes.Image ||
              block?.type === blockTypes.Survey
            ) {
              return (
                <SwiperSlide key={block.id}>
                  {block.type === blockTypes.Image && 'imageUrl' in block.data ? (
                    <ShowImage inView={inView} imageSrc={block.data.imageUrl}></ShowImage>
                  ) : block.type === blockTypes.Code && 'code' in block.data ? (
                    <ShowCode inView={inView} UserCode={block.data.code}></ShowCode>
                  ) : (
                    <ShowSurvey postId={postId} block={block}></ShowSurvey>
                  )}
                </SwiperSlide>
              );
            }
          })}
        </Swiper>
      </div>
    )
  );
};

const ShowCode = ({ UserCode, inView }: { UserCode?: string; inView: boolean }) => {
  return (
    <div className={Styles.CodePostBlock}>
      {inView && (
        <LiveProvider enableTypeScript={true} code={UserCode}>
          {UserCode ? <LivePreview /> : 'Здесь будет результат.'}
        </LiveProvider>
      )}
      <button
        className={Styles.copy}
        onClick={(e) => {
          e.preventDefault();
          UserCode && navigator.clipboard.writeText(UserCode);
          toast.info('Код блока скопирован.');
        }}
      >
        <ButtonIcons Icon={buttonIcons.Code}></ButtonIcons>
      </button>
    </div>
  );
};

const ShowImage = ({ imageSrc, inView }: { imageSrc?: string; inView: boolean }) => {
  return (
    <div className={Styles.ImageBlock}>
      {imageSrc && inView ? <img src={imageSrc} alt="" /> : 'Картинка сломалась('}
      <button
        className={Styles.copy}
        onClick={(e) => {
          e.preventDefault();
          imageSrc && navigator.clipboard.writeText(imageSrc);
          toast.info('Ссылка на изоброжение скопирована.');
        }}
      >
        <ButtonIcons Icon={buttonIcons.Image}></ButtonIcons>
      </button>
    </div>
  );
};

const ShowSurvey = ({ block, postId }: { block: blockType; postId?: string | undefined }) => {
  const { UserId, UserIsAuth } = useAuth();
  const [SelectVariant, setSelectVariant] = useState<number | null | undefined>(null);

  const [ItPostSelect, setItPostSelect] = useState(
    'variants' in block.data &&
      Object.values(block.data.variants || 0).some((obj) => obj.selected && obj.selected[UserId] === UserId),
  );

  const selectedUsers = Object.values(('variants' in block.data && block.data.variants) || 0).reduce((acc, obj) => {
    if (obj.selected) {
      const users = Object.keys(obj.selected);
      acc.push(...users);
    }
    return acc;
  }, []);

  function selectVariant(Variant: { id: number | undefined; text: string; selected?: Record<string, string> }) {
    if (!ItPostSelect && UserIsAuth) {
      postRequestWithoutNewId(
        'posts/' + postId + '/blocks/' + block.id + '/data/variants/' + Variant.id + '/selected/' + UserId,
        UserId,
      );
      setSelectVariant(Variant.id);
      setItPostSelect(true);
    } else if (!UserIsAuth) {
      toast.error(NOTIFI_TEXTS.ERROR_NOT_AUTH);
    } else if (ItPostSelect) {
      toast.warning('Вы уже выбирали ответ на этом посте.');
    }
  }

  return (
    <div className={Styles.SurveyMode}>
      <div className={Styles.title}>{'question' in block.data && block.data.question}</div>
      <div className={Styles.variants}>
        {'variants' in block.data &&
          block.data.variants?.map((variant) => (
            <div
              onClick={(e) => {
                e.stopPropagation();
                selectVariant(variant);
              }}
              className={Styles.variant}
              key={variant.id}
            >
              <progress
                max={typeof SelectVariant === 'number' ? selectedUsers.length + 1 : selectedUsers.length}
                value={
                  ItPostSelect
                    ? SelectVariant === variant.id
                      ? Object.values(variant.selected || '').length + 1
                      : Object.values(variant.selected || '').length
                    : 0
                }
              ></progress>
              <div className={Styles.text}>{variant.text}</div>
              {ItPostSelect && (
                <div className={Styles.stat}>
                  {SelectVariant === variant.id
                    ? Object.values(variant.selected || '').length + 1
                    : Object.values(variant.selected || '').length}
                  /{typeof SelectVariant === 'number' ? selectedUsers.length + 1 : selectedUsers.length}
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default BlocksRender;
export { ShowSurvey };
