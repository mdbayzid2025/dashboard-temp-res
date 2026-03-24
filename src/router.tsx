import { createBrowserRouter } from "react-router-dom";
import About from "./components/Dashboard/About";
import FAQ from "./components/Dashboard/FAQ";
import PrivacyPolicy from "./components/Dashboard/Privacypolicy";
import TermsConditions from "./components/Dashboard/Termsconditions";
import AppLayout from "./layout/AppLayout";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import Blank from "./pages/Blank";
import Calendar from "./pages/Calendar";
import BarChart from "./pages/Charts/BarChart";
import LineChart from "./pages/Charts/LineChart";
import Home from "./pages/Dashboard/Home";
import FormElements from "./pages/Forms/FormElements";
import NotFound from "./pages/OtherPage/NotFound";
import BasicTables from "./pages/Tables/BasicTables";
import Alerts from "./pages/UiElements/Alerts";
import Avatars from "./pages/UiElements/Avatars";
import Badges from "./pages/UiElements/Badges";
import Buttons from "./pages/UiElements/Buttons";
import Images from "./pages/UiElements/Images";
import Videos from "./pages/UiElements/Videos";
import UserProfiles from "./pages/UserProfiles";

const router = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        errorElement: <NotFound />,
        children: [
            {
                index: true,
                element: <Home />
            },

            // Other Pages
            {
                path: "profile",
                element: <UserProfiles />
            },
            {
                path: "about",
                element: <About />
            },
            {
                path: "terms-condition",
                element: <TermsConditions />
            },
            {
                path: "privacy-policy",
                element: <PrivacyPolicy />
            },
            {
                path: "faq",
                element: <FAQ />
            },
            {
                path: "calendar",
                element: <Calendar />
            },
            {
                path: "blank",
                element: <Blank />
            },

            // Forms
            {
                path: "form-elements",
                element: <FormElements />
            },

            // Tables
            {
                path: "basic-tables",
                element: <BasicTables />
            },

            // UI Elements
            {
                path: "alerts",
                element: <Alerts />
            },
            {
                path: "avatars",
                element: <Avatars />
            },
            {
                path: "badge",
                element: <Badges />
            },
            {
                path: "buttons",
                element: <Buttons />
            },
            {
                path: "images",
                element: <Images />
            },
            {
                path: "videos",
                element: <Videos />
            },

            // Charts
            {
                path: "line-chart",
                element: <LineChart />
            },
            {
                path: "bar-chart",
                element: <BarChart />
            },
        ]
    },

    // Auth Routes
    { path: "/signin", element: <SignIn /> },
    { path: "/signup", element: <SignUp /> },

    // Fallback
    { path: "*", element: <NotFound /> },
]);

export default router;