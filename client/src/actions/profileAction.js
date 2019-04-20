import { GET_ERRORS, SET_CURRENT_USER, GET_PROFILE } from "./types";
import axios from "axios";
import { setAuthToken } from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

// Get current
