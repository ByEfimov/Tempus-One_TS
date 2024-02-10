export enum postIcons {
    sub = 'sub',
    like = 'like',
    comment = 'comment',
    repost = 'repost',
    eye = 'eye',
}

const PostIcons = ({ Icon }: { Icon: postIcons }) => {
    switch (Icon) {
        case 'sub':
            return (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    viewBox="0 0 25 25"
                    fill="none"
                >
                    <path
                        d="M8.33333 3.12533C6.60744 3.12533 5.20833 4.52444 5.20833 6.25033C5.20833 7.97621 6.60744 9.37533 8.33333 9.37533C10.0592 9.37533 11.4583 7.97621 11.4583 6.25033C11.4583 4.52444 10.0592 3.12533 8.33333 3.12533ZM3.125 6.25033C3.125 3.37384 5.45685 1.04199 8.33333 1.04199C11.2098 1.04199 13.5417 3.37384 13.5417 6.25033C13.5417 9.12681 11.2098 11.4587 8.33333 11.4587C5.45685 11.4587 3.125 9.12681 3.125 6.25033ZM0 18.7503C0 15.8738 2.33185 13.542 5.20833 13.542H11.4583C14.3348 13.542 16.6667 15.8738 16.6667 18.7503V21.8753C16.6667 22.4506 16.2003 22.917 15.625 22.917C15.0497 22.917 14.5833 22.4506 14.5833 21.8753V18.7503C14.5833 17.0244 13.1842 15.6253 11.4583 15.6253H5.20833C3.48244 15.6253 2.08333 17.0244 2.08333 18.7503V21.8753C2.08333 22.4506 1.61696 22.917 1.04167 22.917C0.46637 22.917 0 22.4506 0 21.8753V18.7503ZM20.8333 7.29199C21.4086 7.29199 21.875 7.75836 21.875 8.33366V10.417H23.9583C24.5336 10.417 25 10.8834 25 11.4587C25 12.034 24.5336 12.5003 23.9583 12.5003H21.875V14.5837C21.875 15.159 21.4086 15.6253 20.8333 15.6253C20.258 15.6253 19.7917 15.159 19.7917 14.5837V12.5003H17.7083C17.133 12.5003 16.6667 12.034 16.6667 11.4587C16.6667 10.8834 17.133 10.417 17.7083 10.417H19.7917V8.33366C19.7917 7.75836 20.258 7.29199 20.8333 7.29199Z"
                        fill="white"
                    />
                </svg>
            );

        case 'like':
            return (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="23"
                    height="22"
                    viewBox="0 0 23 22"
                    fill="none"
                >
                    <path
                        d="M13.9696 1.0977C14.7637 0.758202 15.616 0.583008 16.4775 0.583008C17.339 0.583008 18.1913 0.758202 18.9853 1.0977C19.7791 1.43709 20.4982 1.93359 21.1024 2.55721C21.7068 3.18063 22.1846 3.91906 22.5101 4.72952C22.8355 5.53992 23.0026 6.40747 23.0026 7.28287C23.0026 8.15827 22.8355 9.02582 22.5101 9.83622C22.1847 10.6466 21.7069 11.385 21.1025 12.0084L12.292 21.0996C12.0958 21.3021 11.8259 21.4163 11.544 21.4163C11.2621 21.4163 10.9922 21.3021 10.796 21.0996L1.98549 12.0084C0.765664 10.7497 0.0859375 9.04928 0.0859375 7.28287C0.0859375 5.51646 0.765664 3.81608 1.98549 2.55738C3.20639 1.29758 4.86937 0.583558 6.61053 0.583558C8.35169 0.583558 10.0147 1.29758 11.2356 2.55738L11.544 2.87564L11.8523 2.55756C12.4565 1.93386 13.1758 1.43712 13.9696 1.0977ZM19.6063 4.00706C19.1924 3.5798 18.7028 3.24267 18.1663 3.01328C17.6299 2.78393 17.0561 2.66634 16.4775 2.66634C15.8989 2.66634 15.3251 2.78393 14.7887 3.01328C14.2522 3.24267 13.7625 3.5798 13.3487 4.00706L12.292 5.09737C12.0958 5.29982 11.8259 5.4141 11.544 5.4141C11.2621 5.4141 10.9922 5.29982 10.796 5.09737L9.73951 4.00724C8.90392 3.14502 7.77769 2.66689 6.61053 2.66689C5.44337 2.66689 4.31714 3.14502 3.48155 4.00724C2.64487 4.87057 2.16927 6.04828 2.16927 7.28287C2.16927 8.51746 2.64487 9.69516 3.48155 10.5585L11.544 18.8779L19.6065 10.5585C20.0206 10.1314 20.3509 9.6223 20.5768 9.0599C20.8026 8.49745 20.9193 7.89351 20.9193 7.28287C20.9193 6.67223 20.8026 6.06829 20.5768 5.50584C20.3509 4.94343 20.0204 4.43419 19.6063 4.00706Z"
                        fill="white"
                    />
                </svg>
            );
        case 'comment':
            return (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="21"
                    height="21"
                    viewBox="0 0 21 21"
                    fill="none"
                >
                    <g clipPath="url(#clip0_355_144)">
                        <path
                            d="M2.59049 9.24967C2.59049 5.79789 5.38871 2.99967 8.84049 2.99967C12.2923 2.99967 15.0905 5.79789 15.0905 9.24967C15.0905 12.7015 12.2923 15.4997 8.84049 15.4997H2.59049V9.24967ZM8.84049 1.33301C4.46824 1.33301 0.923828 4.87742 0.923828 9.24967V16.333C0.923828 16.7932 1.29692 17.1663 1.75716 17.1663H7.47823C8.52537 19.1475 10.6075 20.4997 13.0072 20.4997H18.4238C18.8841 20.4997 19.2572 20.1266 19.2572 19.6664V14.2497C19.2572 12.204 18.2738 10.3885 16.7572 9.24933C16.757 4.87724 13.2126 1.33301 8.84049 1.33301ZM16.4954 11.2763C17.1788 12.0772 17.5905 13.1155 17.5905 14.2497V18.833H13.0072C11.5738 18.833 10.2931 18.175 9.45214 17.1431C12.8515 16.8833 15.6503 14.4767 16.4954 11.2763Z"
                            fill="#BDBDBD"
                        />
                    </g>
                    <defs>
                        <clipPath id="clip0_355_144">
                            <rect
                                width="20"
                                height="20"
                                fill="white"
                                transform="translate(0.0908203 0.5)"
                            />
                        </clipPath>
                    </defs>
                </svg>
            );
        case 'repost':
            return (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    viewBox="0 0 25 25"
                    fill="none"
                >
                    <g clipPath="url(#clip0_355_148)">
                        <path
                            d="M8.10275 13.9944C6.06877 11.9604 6.06877 8.66268 8.10275 6.6287L12.5222 2.20928C14.5561 0.175299 17.8539 0.175299 19.8879 2.20928C21.9218 4.24326 21.9218 7.541 19.8879 9.57498L19.5196 9.94326C19.1128 10.3501 18.4532 10.3501 18.0464 9.94326C17.6396 9.53647 17.6396 8.87692 18.0464 8.47012L18.4147 8.10184C19.6351 6.88145 19.6351 4.90281 18.4147 3.68242C17.1943 2.46203 15.2157 2.46203 13.9953 3.68242L9.57589 8.10184C8.3555 9.32223 8.3555 11.3009 9.57589 12.5213C10.2358 13.1811 11.1157 13.4844 11.9816 13.4304C12.5558 13.3946 13.0503 13.8311 13.0861 14.4053C13.1219 14.9794 12.6855 15.4739 12.1113 15.5097C10.6742 15.5993 9.20282 15.0945 8.10275 13.9944ZM4.4199 22.0967C2.38592 20.0627 2.38592 16.7649 4.4199 14.731L4.78819 14.3627C5.19498 13.9559 5.85453 13.9559 6.26132 14.3627C6.66812 14.7695 6.66812 15.429 6.26132 15.8358L5.89304 16.2041C4.67265 17.4245 4.67265 19.4031 5.89304 20.6235C7.11343 21.8439 9.09207 21.8439 10.3125 20.6235L14.7319 16.2041C15.9523 14.9837 15.9523 13.0051 14.7319 11.7847C14.2086 11.2614 13.5486 10.9634 12.8668 10.8883C12.295 10.8253 11.8824 10.3107 11.9454 9.73889C12.0084 9.16705 12.523 8.75452 13.0948 8.81749C14.2305 8.94253 15.3348 9.44132 16.205 10.3115C18.239 12.3455 18.239 15.6433 16.205 17.6772L11.7856 22.0967C9.75162 24.1306 6.45388 24.1306 4.4199 22.0967Z"
                            fill="#BDBDBD"
                        />
                    </g>
                    <defs>
                        <clipPath id="clip0_355_148">
                            <rect width="25" height="25" fill="white" />
                        </clipPath>
                    </defs>
                </svg>
            );
        case 'eye':
            return (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="26"
                    viewBox="0 0 25 26"
                    fill="none"
                >
                    <path
                        d="M2.68168 13.737C3.16191 14.4805 3.87309 15.4694 4.79639 16.4542C6.662 18.4442 9.27032 20.2917 12.5 20.2917C15.7297 20.2917 18.338 18.4442 20.2036 16.4542C21.1269 15.4694 21.8381 14.4805 22.3183 13.737C22.5053 13.4474 22.6562 13.1967 22.7701 13C22.6562 12.8033 22.5053 12.5525 22.3183 12.263C21.8381 11.5195 21.1269 10.5306 20.2036 9.54577C18.338 7.55579 15.7297 5.70833 12.5 5.70833C9.27032 5.70833 6.662 7.55579 4.79639 9.54577C3.87309 10.5306 3.16191 11.5195 2.68168 12.263C2.49471 12.5525 2.34378 12.8033 2.22994 13C2.34378 13.1967 2.49471 13.4474 2.68168 13.737ZM24.8897 12.5334C24.8899 12.5338 24.89 12.5342 23.9583 13C24.89 13.4658 24.8899 13.4662 24.8897 13.4666L24.8892 13.4675L24.888 13.4699L24.8844 13.477L24.8726 13.5002C24.8626 13.5195 24.8486 13.5465 24.8305 13.5808C24.7942 13.6493 24.7416 13.7466 24.6729 13.8688C24.5356 14.1129 24.3335 14.4568 24.0684 14.8672C23.5395 15.6861 22.7533 16.7806 21.7235 17.8791C19.6828 20.0558 16.562 22.375 12.5 22.375C8.43801 22.375 5.31717 20.0558 3.27652 17.8791C2.2467 16.7806 1.46048 15.6861 0.9316 14.8672C0.66651 14.4568 0.464367 14.1129 0.327053 13.8688C0.258358 13.7466 0.205771 13.6493 0.169535 13.5808C0.151413 13.5465 0.13737 13.5195 0.127435 13.5002L0.115615 13.477L0.11202 13.4699L0.110802 13.4675L0.110338 13.4666C0.110147 13.4662 0.109972 13.4658 1.04167 13C0.109972 12.5342 0.110147 12.5338 0.110338 12.5334L0.110802 12.5325L0.11202 12.5301L0.115615 12.523L0.127435 12.4998C0.13737 12.4805 0.151413 12.4535 0.169535 12.4192C0.205771 12.3507 0.258358 12.2534 0.327053 12.1312C0.464367 11.8871 0.66651 11.5432 0.9316 11.1328C1.46048 10.3139 2.2467 9.21937 3.27652 8.12089C5.31717 5.94421 8.43801 3.625 12.5 3.625C16.562 3.625 19.6828 5.94421 21.7235 8.12089C22.7533 9.21937 23.5395 10.3139 24.0684 11.1328C24.3335 11.5432 24.5356 11.8871 24.6729 12.1312C24.7416 12.2534 24.7942 12.3507 24.8305 12.4192C24.8486 12.4535 24.8626 12.4805 24.8726 12.4998L24.8844 12.523L24.888 12.5301L24.8892 12.5325L24.8897 12.5334ZM23.9583 13L24.89 12.5342C25.0367 12.8274 25.0367 13.1726 24.89 13.4658L23.9583 13ZM0.109972 12.5342L1.04167 13L0.109972 13.4658C-0.0366572 13.1726 -0.0366572 12.8274 0.109972 12.5342ZM10.4167 13C10.4167 11.8494 11.3494 10.9167 12.5 10.9167C13.6506 10.9167 14.5833 11.8494 14.5833 13C14.5833 14.1506 13.6506 15.0833 12.5 15.0833C11.3494 15.0833 10.4167 14.1506 10.4167 13ZM12.5 8.83333C10.1988 8.83333 8.33333 10.6988 8.33333 13C8.33333 15.3012 10.1988 17.1667 12.5 17.1667C14.8012 17.1667 16.6667 15.3012 16.6667 13C16.6667 10.6988 14.8012 8.83333 12.5 8.83333Z"
                        fill="#BDBDBD"
                    />
                </svg>
            );
    }
};

export default PostIcons;
