import Chat from "./shared/components/chat";
import "./App.scss";
import { Senders } from "./shared/components/senders";
import { TokensModal } from "./shared/components/tokens";
import { useAppSelector } from "./shared/hooks/redux-hooks";

const App = () => {
    const { tokenModal } = useAppSelector(({ tokens }) => tokens);

    return (
        <div className="WP-app">
            {tokenModal && <TokensModal />}
            <Senders />
            <Chat />
        </div>
    );
};

export default App;
