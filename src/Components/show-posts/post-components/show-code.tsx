import { FC } from 'react';
import { LivePreview, LiveProvider } from 'react-live';

interface ShowCodeProps {
    UserCode: string;
}

const ShowCode: FC<ShowCodeProps> = ({ UserCode }) => {
    return (
        <LiveProvider enableTypeScript={true} code={UserCode}>
            {UserCode ? <LivePreview /> : 'Здесь будет результат.'}
        </LiveProvider>
    );
};
export default ShowCode;
