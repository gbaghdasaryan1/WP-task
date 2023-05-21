import { resetTokens, setApiToken, setIdInstance, setTokenModal } from "../../../redux/reducers/tokens/tokens-slice";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import "./tokens.scss";

export const TokensModal = () => {
    const dispatch = useAppDispatch();
    const { idInstance, apiTokenInstance } = useAppSelector(({ tokens }) => tokens);

    const handleSaveTokens = () => {
        if (idInstance || apiTokenInstance) return;

        if (!idInstance.trim() || !apiTokenInstance.trim()) {
            dispatch(resetTokens());
            return;
        }
        dispatch(setTokenModal(false));
    };

    return (
        <div className={`WP-tokens-overlay`}>
            <div className="WP-tokens-modal">
                <label htmlFor="id">
                    ID Instance
                    <input
                        type="text"
                        id="id"
                        value={idInstance}
                        onChange={({ target }) => dispatch(setIdInstance(target.value))}
                    />
                </label>
                <label htmlFor="api">
                    API Token Instance
                    <input
                        type="text"
                        id="api"
                        value={apiTokenInstance}
                        onChange={({ target }) => dispatch(setApiToken(target.value))}
                    />
                </label>

                <button onClick={handleSaveTokens}>Login</button>
            </div>
        </div>
    );
};
