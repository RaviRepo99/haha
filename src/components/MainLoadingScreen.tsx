interface MainLoadingScreenProps {
  isFadingOut?: boolean;
}

const MainLoadingScreen = ({ isFadingOut = false }: MainLoadingScreenProps) => (
  <div
    id="main-loading-screen"
    className={`fixed inset-0 z-[9999] bg-white transition-opacity duration-500 ease-in-out ${isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
  />
);

export default MainLoadingScreen;
