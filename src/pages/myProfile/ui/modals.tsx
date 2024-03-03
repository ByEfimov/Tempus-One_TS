import SettingsUserModal from '@/widgets/modals/settingsModals/userSettings';

interface MyProfileModalsProps {
  settingsModalOpen: boolean;
  setSettingsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function MyProfileModals({ settingsModalOpen, setSettingsModalOpen }: MyProfileModalsProps) {
  return settingsModalOpen && <SettingsUserModal setModalOpen={setSettingsModalOpen} />;
}
