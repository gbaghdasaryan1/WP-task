import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";

import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../../redux/root-reducer";



export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;