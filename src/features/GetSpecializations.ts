import axios from 'axios';

export function getSpecializations(
    callback: React.Dispatch<
        React.SetStateAction<
            | {
                  label: string;
                  value: string;
              }[]
            | undefined
        >
    >,
) {
    axios.get('https://api.hh.ru/specializations').then((response) => {
        const data = response.data;
        callback(
            data[0].specializations.map((specialization: { name: string }) => ({
                label: specialization.name,
                value: specialization.name,
            })),
        );
    });
}
