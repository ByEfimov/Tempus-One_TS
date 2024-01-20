export enum headerIcons {
    Back = 'Back',
    Search = 'Search',
    Add = 'Add',
    Sub = 'Sub',
    SubTeam = 'SubTeam',
    Accept = 'Accept',
    Settings = 'Settings',
}

const HeaderIcons = ({ Icon }: { Icon: headerIcons }) => {
    switch (Icon) {
        case 'Settings':
            return (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    viewBox="0 0 25 25"
                    fill="none"
                >
                    <g clip-path="url(#clip0_279_167)">
                        <path
                            d="M11.7634 2.38843C11.9588 2.19308 12.2237 2.08333 12.5 2.08333C12.7763 2.08333 13.0412 2.19308 13.2366 2.38843C13.4319 2.58378 13.5417 2.84873 13.5417 3.125V3.21875L13.5417 3.2229C13.5438 3.76125 13.7033 4.28721 14.0006 4.73606C14.2968 5.18334 14.7169 5.53458 15.2095 5.74689C15.7128 5.96779 16.2706 6.03345 16.8115 5.93538C17.3542 5.83697 17.855 5.57829 18.2493 5.19261L18.3203 5.12158C18.4171 5.02473 18.5319 4.94789 18.6584 4.89547C18.7849 4.84305 18.9204 4.81607 19.0573 4.81607C19.1942 4.81607 19.3297 4.84305 19.4562 4.89547C19.5826 4.94789 19.6975 5.02473 19.7943 5.12158L19.7951 5.1224C19.8919 5.21914 19.9688 5.33402 20.0212 5.46048C20.0736 5.58694 20.1006 5.72249 20.1006 5.85937C20.1006 5.99626 20.0736 6.13181 20.0212 6.25827C19.9688 6.38473 19.8915 6.50002 19.7947 6.59677L19.7321 6.65922L19.7241 6.66743C19.3384 7.06172 19.0797 7.5625 18.9813 8.10521C18.8959 8.57638 18.9347 9.06039 19.0921 9.51001C19.1045 9.6046 19.1298 9.69727 19.1676 9.78534C19.3796 10.2802 19.7318 10.7022 20.1806 10.9994C20.6295 11.2967 21.1554 11.4562 21.6938 11.4583L21.6979 11.4583H21.875C22.1513 11.4583 22.4162 11.5681 22.6116 11.7634C22.8069 11.9588 22.9167 12.2237 22.9167 12.5C22.9167 12.7763 22.8069 13.0412 22.6116 13.2366C22.4162 13.4319 22.1513 13.5417 21.875 13.5417L21.7812 13.5417L21.7771 13.5417C21.2388 13.5438 20.7128 13.7033 20.2639 14.0006C19.8166 14.2968 19.4654 14.717 19.2531 15.2096C19.0322 15.7129 18.9666 16.2706 19.0646 16.8115C19.163 17.3542 19.4217 17.855 19.8074 18.2493L19.8784 18.3203C19.9753 18.417 20.0521 18.5319 20.1045 18.6584C20.1569 18.7849 20.1839 18.9204 20.1839 19.0573C20.1839 19.1942 20.1569 19.3297 20.1045 19.4562C20.0521 19.5826 19.9753 19.6975 19.8784 19.7943L19.8776 19.7951C19.7809 19.8919 19.666 19.9688 19.5395 20.0212C19.4131 20.0736 19.2775 20.1006 19.1406 20.1006C19.0037 20.1006 18.8682 20.0736 18.7417 20.0212C18.6153 19.9688 18.5 19.8915 18.4032 19.7947L18.3408 19.7321L18.3326 19.7241C17.9383 19.3384 17.4375 19.0797 16.8948 18.9813C16.354 18.8832 15.7962 18.9489 15.293 19.1697C14.8003 19.382 14.3802 19.7333 14.0839 20.1806C13.7867 20.6295 13.6272 21.1554 13.625 21.6938L13.625 21.6979V21.875C13.625 22.1513 13.5153 22.4162 13.3199 22.6116C13.1246 22.8069 12.8596 22.9167 12.5833 22.9167C12.3071 22.9167 12.0421 22.8069 11.8468 22.6116C11.6514 22.4162 11.5417 22.1513 11.5417 21.875V21.7812L11.5414 21.7569C11.5284 21.2031 11.3492 20.6661 11.027 20.2156C10.7111 19.774 10.2722 19.4355 9.76538 19.2422C9.26871 19.0301 8.72044 18.9682 8.18854 19.0646C7.64584 19.163 7.14501 19.4217 6.75072 19.8074L6.67969 19.8784C6.58295 19.9753 6.46806 20.0521 6.3416 20.1045C6.21515 20.1569 6.0796 20.1839 5.94271 20.1839C5.80582 20.1839 5.67027 20.1569 5.54381 20.1045C5.41735 20.0521 5.30247 19.9753 5.20573 19.8784L5.20491 19.8776C5.10806 19.7809 5.03123 19.666 4.97881 19.5395C4.92638 19.4131 4.8994 19.2775 4.8994 19.1406C4.8994 19.0037 4.92638 18.8682 4.97881 18.7417C5.03123 18.6153 5.10847 18.5 5.20532 18.4032L5.26786 18.3408L5.2759 18.3326C5.66158 17.9383 5.92031 17.4375 6.01871 16.8948C6.11678 16.3539 6.05112 15.7961 5.83022 15.2928C5.61792 14.8002 5.26667 14.3801 4.81939 14.0839C4.37055 13.7867 3.84458 13.6271 3.30624 13.625H3.125C2.84873 13.625 2.58378 13.5153 2.38843 13.3199C2.19308 13.1246 2.08333 12.8596 2.08333 12.5833C2.08333 12.3071 2.19308 12.0421 2.38843 11.8468C2.58378 11.6514 2.84873 11.5417 3.125 11.5417H3.21875L3.24311 11.5414C3.79686 11.5284 4.3339 11.3492 4.78442 11.027C5.22602 10.7111 5.56447 10.2722 5.75776 9.76539C5.96993 9.26871 6.03182 8.72045 5.93538 8.18854C5.83697 7.64584 5.57829 7.14501 5.19261 6.75072L5.12158 6.67969C5.02473 6.58294 4.94789 6.46806 4.89547 6.3416C4.84305 6.21515 4.81607 6.0796 4.81607 5.94271C4.81607 5.80582 4.84305 5.67027 4.89547 5.54381C4.94789 5.41736 5.02473 5.30247 5.12158 5.20573L5.1224 5.20491C5.21914 5.10806 5.33402 5.03123 5.46048 4.97881C5.58694 4.92638 5.72248 4.8994 5.85937 4.8994C5.99627 4.8994 6.13181 4.92638 6.25827 4.97881C6.38473 5.03123 6.50002 5.10847 6.59676 5.20532L6.65922 5.26786L6.66743 5.2759C7.06172 5.66158 7.5625 5.92031 8.10521 6.01871C8.57638 6.10414 9.06039 6.06533 9.51001 5.90788C9.6046 5.89552 9.69727 5.87019 9.78534 5.83244C10.2802 5.62037 10.7022 5.26823 10.9994 4.81939C11.2967 4.37055 11.4562 3.84458 11.4583 3.30624V3.125C11.4583 2.84873 11.5681 2.58378 11.7634 2.38843ZM21.1613 16.0456L20.2083 15.625L21.1658 16.0353C21.2178 15.914 21.3042 15.8105 21.4143 15.7376C21.5239 15.6649 21.6523 15.6258 21.7839 15.625H21.875C22.7038 15.625 23.4987 15.2958 24.0847 14.7097C24.6708 14.1237 25 13.3288 25 12.5C25 11.6712 24.6708 10.8763 24.0847 10.2903C23.4987 9.70424 22.7038 9.375 21.875 9.375H21.7005C21.569 9.37418 21.4406 9.33507 21.3309 9.26244C21.257 9.21352 21.1939 9.15082 21.1446 9.07819C21.1297 9.00721 21.1074 8.93778 21.078 8.87108C21.0234 8.74731 21.0071 8.61001 21.0312 8.4769C21.0551 8.34523 21.1174 8.22362 21.2103 8.1274L21.2678 8.0699C21.5582 7.77976 21.7885 7.43525 21.9457 7.05606C22.103 6.6767 22.1839 6.27005 22.1839 5.85937C22.1839 5.4487 22.103 5.04205 21.9457 4.66269C21.7886 4.28367 21.5584 3.93931 21.2682 3.64926C20.978 3.35871 20.6333 3.12821 20.254 2.97095C19.8746 2.81368 19.468 2.73274 19.0573 2.73274C18.6466 2.73274 18.24 2.81368 17.8606 2.97095C17.4812 3.12821 17.1366 3.3587 16.8464 3.64926L16.7892 3.70636C16.693 3.79925 16.5714 3.86159 16.4398 3.88547C16.3067 3.9096 16.1694 3.89325 16.0456 3.83863L16.0353 3.83423C15.914 3.78221 15.8105 3.69584 15.7376 3.58575C15.6649 3.47608 15.6258 3.34765 15.625 3.21614V3.125C15.625 2.2962 15.2958 1.50134 14.7097 0.915291C14.1237 0.32924 13.3288 0 12.5 0C11.6712 0 10.8763 0.32924 10.2903 0.915291C9.70424 1.50134 9.375 2.2962 9.375 3.125V3.29948C9.37418 3.43098 9.33507 3.55942 9.26244 3.66908C9.21352 3.74295 9.15082 3.80614 9.0782 3.85544C9.00721 3.8703 8.93779 3.89258 8.87108 3.92202C8.74731 3.97664 8.61001 3.99294 8.4769 3.9688C8.34523 3.94493 8.22362 3.88258 8.12741 3.78968L8.07031 3.73259C7.78008 3.44204 7.43543 3.21154 7.05606 3.05428C6.67669 2.89702 6.27005 2.81607 5.85937 2.81607C5.4487 2.81607 5.04206 2.89702 4.66269 3.05428C4.2835 3.21147 3.93899 3.44182 3.64885 3.73218C3.35849 4.02232 3.12813 4.36683 2.97095 4.74602C2.81368 5.12539 2.73274 5.53203 2.73274 5.94271C2.73274 6.35338 2.81368 6.76003 2.97095 7.1394C3.12821 7.51877 3.35871 7.86342 3.64926 8.15365L3.70635 8.21074C3.79925 8.30696 3.86159 8.42856 3.88547 8.56023C3.9096 8.69335 3.89331 8.83064 3.83868 8.95441C3.82982 8.97449 3.8216 8.99484 3.81402 9.01544C3.76713 9.14295 3.68295 9.2534 3.57245 9.33244C3.46449 9.40965 3.33629 9.45339 3.20379 9.45833H3.125C2.2962 9.45833 1.50134 9.78757 0.915291 10.3736C0.32924 10.9597 0 11.7545 0 12.5833C0 13.4121 0.32924 14.207 0.915291 14.793C1.50134 15.3791 2.2962 15.7083 3.125 15.7083H3.29948C3.43098 15.7092 3.55942 15.7483 3.66908 15.8209C3.77917 15.8938 3.86549 15.9973 3.91751 16.1187L3.92202 16.1289C3.97664 16.2527 3.99294 16.39 3.9688 16.5231C3.94493 16.6548 3.88259 16.7764 3.7897 16.8726L3.73259 16.9297C3.44204 17.2199 3.21154 17.5646 3.05428 17.9439C2.89702 18.3233 2.81607 18.73 2.81607 19.1406C2.81607 19.5513 2.89702 19.9579 3.05428 20.3373C3.21154 20.7167 3.44204 21.0613 3.73259 21.3516C4.02265 21.6417 4.36701 21.8719 4.74602 22.0291C5.12539 22.1863 5.53203 22.2673 5.94271 22.2673C6.35338 22.2673 6.76003 22.1863 7.1394 22.0291C7.51859 21.8719 7.8635 21.6411 8.15365 21.3507L8.21073 21.2937C8.30695 21.2008 8.42856 21.1384 8.56023 21.1145C8.69335 21.0904 8.83064 21.1067 8.95441 21.1613C8.97449 21.1702 8.99484 21.1784 9.01544 21.186C9.14295 21.2329 9.2534 21.317 9.33244 21.4275C9.40965 21.5355 9.45339 21.6637 9.45833 21.7962V21.875C9.45833 22.7038 9.78757 23.4987 10.3736 24.0847C10.9597 24.6708 11.7545 25 12.5833 25C13.4121 25 14.207 24.6708 14.793 24.0847C15.3791 23.4987 15.7083 22.7038 15.7083 21.875V21.7005C15.7092 21.569 15.7483 21.4406 15.8209 21.3309C15.8938 21.2208 15.9973 21.1345 16.1187 21.0825L16.1289 21.078C16.2527 21.0234 16.39 21.0071 16.5231 21.0312C16.6548 21.0551 16.7764 21.1174 16.8726 21.2103L16.9301 21.2678C17.2202 21.5582 17.5647 21.7885 17.9439 21.9457C18.3233 22.103 18.73 22.1839 19.1406 22.1839C19.5513 22.1839 19.9579 22.103 20.3373 21.9457C20.7165 21.7885 21.061 21.5582 21.3512 21.2678C21.351 21.268 21.3509 21.2681 21.3507 21.2682L20.6146 20.5312L21.3516 21.2674C21.3514 21.2675 21.3513 21.2677 21.3512 21.2678C21.6415 20.9777 21.8719 20.6332 22.0291 20.254C22.1863 19.8746 22.2673 19.468 22.2673 19.0573C22.2673 18.6466 22.1863 18.24 22.0291 17.8606C21.8719 17.4814 21.6411 17.1365 21.3507 16.8464L21.2936 16.7892C21.2007 16.693 21.1384 16.5714 21.1145 16.4398C21.0904 16.3067 21.1067 16.1694 21.1613 16.0456ZM10.4167 12.5C10.4167 11.3494 11.3494 10.4167 12.5 10.4167C13.6506 10.4167 14.5833 11.3494 14.5833 12.5C14.5833 13.6506 13.6506 14.5833 12.5 14.5833C11.3494 14.5833 10.4167 13.6506 10.4167 12.5ZM12.5 8.33333C10.1988 8.33333 8.33333 10.1988 8.33333 12.5C8.33333 14.8012 10.1988 16.6667 12.5 16.6667C14.8012 16.6667 16.6667 14.8012 16.6667 12.5C16.6667 10.1988 14.8012 8.33333 12.5 8.33333Z"
                            fill="white"
                        />
                    </g>
                    <defs>
                        <clipPath id="clip0_279_167">
                            <rect width="25" height="25" fill="white" />
                        </clipPath>
                    </defs>
                </svg>
            );
        case 'Back':
            return (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="38"
                    height="38"
                    viewBox="0 0 18 13"
                    fill="none"
                >
                    <path
                        d="M1.36426 6.38574L16.3643 6.38574"
                        stroke="white"
                        stroke-width="1.70424"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <path
                        d="M6.55657 12L1.36426 6.38572L6.55657 1"
                        stroke="white"
                        stroke-width="1.70424"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
            );
        case 'Search':
            return (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="26"
                    height="26"
                    viewBox="0 0 26 26"
                    fill="none"
                >
                    <path
                        d="M16.7002 7.40865C14.1727 4.88114 10.0748 4.88114 7.54732 7.40865C5.01982 9.93616 5.01982 14.0341 7.54732 16.5616C10.0748 19.0891 14.1727 19.0891 16.7002 16.5616C19.2277 14.0341 19.2277 9.93616 16.7002 7.40865ZM6.07418 5.93551C9.41528 2.59441 14.8323 2.59441 18.1734 5.93551C21.2651 9.02728 21.4959 13.8967 18.8656 17.2537L23.1633 21.5515C23.5701 21.9583 23.5701 22.6179 23.1633 23.0247C22.7565 23.4315 22.097 23.4315 21.6902 23.0247L17.3924 18.7269C14.0353 21.3572 9.16595 21.1265 6.07418 18.0347C2.73308 14.6936 2.73308 9.27661 6.07418 5.93551Z"
                        fill="white"
                    />
                </svg>
            );
        case 'Add':
            return (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    viewBox="0 0 25 25"
                    fill="none"
                >
                    <path
                        d="M3.12533 12.5003C3.12533 7.32266 7.32266 3.12533 12.5003 3.12533C17.678 3.12533 21.8753 7.32266 21.8753 12.5003C21.8753 17.678 17.678 21.8753 12.5003 21.8753C7.32266 21.8753 3.12533 17.678 3.12533 12.5003ZM12.5003 1.04199C6.17206 1.04199 1.04199 6.17206 1.04199 12.5003C1.04199 18.8286 6.17206 23.9587 12.5003 23.9587C18.8286 23.9587 23.9587 18.8286 23.9587 12.5003C23.9587 6.17206 18.8286 1.04199 12.5003 1.04199ZM13.542 8.33366C13.542 7.75836 13.0756 7.29199 12.5003 7.29199C11.925 7.29199 11.4587 7.75836 11.4587 8.33366V11.4587H8.33366C7.75836 11.4587 7.29199 11.925 7.29199 12.5003C7.29199 13.0756 7.75836 13.542 8.33366 13.542H11.4587V16.667C11.4587 17.2423 11.925 17.7087 12.5003 17.7087C13.0756 17.7087 13.542 17.2423 13.542 16.667V13.542H16.667C17.2423 13.542 17.7087 13.0756 17.7087 12.5003C17.7087 11.925 17.2423 11.4587 16.667 11.4587H13.542V8.33366Z"
                        fill="white"
                    />
                </svg>
            );
        case 'Sub':
            return (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    viewBox="0 0 25 25"
                    fill="none"
                >
                    <path
                        d="M8.33333 3.12484C6.60744 3.12484 5.20833 4.52395 5.20833 6.24984C5.20833 7.97573 6.60744 9.37484 8.33333 9.37484C10.0592 9.37484 11.4583 7.97573 11.4583 6.24984C11.4583 4.52395 10.0592 3.12484 8.33333 3.12484ZM3.125 6.24984C3.125 3.37335 5.45685 1.0415 8.33333 1.0415C11.2098 1.0415 13.5417 3.37335 13.5417 6.24984C13.5417 9.12632 11.2098 11.4582 8.33333 11.4582C5.45685 11.4582 3.125 9.12632 3.125 6.24984ZM0 18.7498C0 15.8734 2.33185 13.5415 5.20833 13.5415H11.4583C14.3348 13.5415 16.6667 15.8734 16.6667 18.7498V21.8748C16.6667 22.4501 16.2003 22.9165 15.625 22.9165C15.0497 22.9165 14.5833 22.4501 14.5833 21.8748V18.7498C14.5833 17.0239 13.1842 15.6248 11.4583 15.6248H5.20833C3.48244 15.6248 2.08333 17.0239 2.08333 18.7498V21.8748C2.08333 22.4501 1.61696 22.9165 1.04167 22.9165C0.46637 22.9165 0 22.4501 0 21.8748V18.7498ZM20.8333 7.2915C21.4086 7.2915 21.875 7.75787 21.875 8.33317V10.4165H23.9583C24.5336 10.4165 25 10.8829 25 11.4582C25 12.0335 24.5336 12.4998 23.9583 12.4998H21.875V14.5832C21.875 15.1585 21.4086 15.6248 20.8333 15.6248C20.258 15.6248 19.7917 15.1585 19.7917 14.5832V12.4998H17.7083C17.133 12.4998 16.6667 12.0335 16.6667 11.4582C16.6667 10.8829 17.133 10.4165 17.7083 10.4165H19.7917V8.33317C19.7917 7.75787 20.258 7.2915 20.8333 7.2915Z"
                        fill="white"
                    />
                </svg>
            );
        case 'SubTeam':
            return (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    viewBox="0 0 25 25"
                    fill="none"
                >
                    <path
                        d="M12.5003 3.12533C7.32266 3.12533 3.12533 7.32266 3.12533 12.5003C3.12533 17.678 7.32266 21.8753 12.5003 21.8753C17.678 21.8753 21.8753 17.678 21.8753 12.5003C21.8753 7.32266 17.678 3.12533 12.5003 3.12533ZM1.04199 12.5003C1.04199 6.17206 6.17206 1.04199 12.5003 1.04199C18.8286 1.04199 23.9587 6.17206 23.9587 12.5003C23.9587 18.8286 18.8286 23.9587 12.5003 23.9587C6.17206 23.9587 1.04199 18.8286 1.04199 12.5003ZM18.3929 6.60776C18.6875 6.90241 18.7782 7.3443 18.6235 7.7312L15.6772 15.0969C15.5713 15.3616 15.3616 15.5713 15.0969 15.6772L7.73121 18.6235C7.34432 18.7782 6.90242 18.6875 6.60777 18.3929C6.31312 18.0982 6.22242 17.6563 6.37718 17.2694L9.32346 9.90374C9.42933 9.63905 9.63907 9.42932 9.90376 9.32345L17.2695 6.37717C17.6563 6.22241 18.0982 6.31311 18.3929 6.60776ZM11.092 11.092L9.21419 15.7865L13.9087 13.9087L15.7865 9.21418L11.092 11.092ZM11.7638 13.2369C12.1706 13.6437 12.8301 13.6437 13.2369 13.2369C13.6437 12.8301 13.6437 12.1706 13.2369 11.7638C12.8301 11.357 12.1706 11.357 11.7638 11.7638C11.357 12.1706 11.357 12.8301 11.7638 13.2369Z"
                        fill="white"
                    />
                </svg>
            );
        case 'Accept':
            return (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    viewBox="0 0 25 25"
                    fill="none"
                >
                    <path
                        d="M3.12533 12.4998C3.12533 7.32217 7.32266 3.12484 12.5003 3.12484C17.678 3.12484 21.8753 7.32217 21.8753 12.4998C21.8753 17.6775 17.678 21.8748 12.5003 21.8748C7.32266 21.8748 3.12533 17.6775 3.12533 12.4998ZM12.5003 1.0415C6.17206 1.0415 1.04199 6.17157 1.04199 12.4998C1.04199 18.8281 6.17206 23.9582 12.5003 23.9582C18.8286 23.9582 23.9587 18.8281 23.9587 12.4998C23.9587 6.17157 18.8286 1.0415 12.5003 1.0415ZM17.9244 10.1114L11.6744 16.3614C11.2676 16.7682 10.6081 16.7682 10.2013 16.3614L7.07626 13.2364C6.66946 12.8296 6.66946 12.1701 7.07626 11.7633C7.48305 11.3565 8.1426 11.3565 8.5494 11.7633L10.9378 14.1517L16.4513 8.63827C16.8581 8.23147 17.5176 8.23147 17.9244 8.63827C18.3312 9.04506 18.3312 9.70461 17.9244 10.1114Z"
                        fill="white"
                    />
                </svg>
            );
    }
};

export default HeaderIcons;
