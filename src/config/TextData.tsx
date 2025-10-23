import Image from "next/image";
import { FaTelegramPlane, FaTwitter, FaYoutube, FaRedditAlien } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { CreatTimeIcon, CurrenLiveIcon, FeaturedIcon, LastReplyIcon, LastTradeIcon, MarketCapIcon } from "@/components/others/Icons";
import BnbImg from "@/../public/assets/images/tools/bnb.svg"
import TokenImg from "@/../public/assets/images/token.png"

export const ProfileMenuList = [
    // { id: 1, text: "Coins hold", },
    { id: 4, text: "Coins created", },
    // { id: 5, text: "Followers", },
    // { id: 6, text: "Following", },
]

export const StagesData = [
    { id: "one", text: "One" },
    { id: "tow", text: "Tow" },
    { id: "three", text: "Three" },
    { id: "four", text: "Four" },
]

export const StageDurationData = [
    { id: 1, text: "1 Days" },
    { id: 1, text: "2 Days" },
    { id: 3, text: "3 Days" },
    { id: 4, text: "4 Days" },
    { id: 5, text: "5 Days" },
    { id: 6, text: "6 Days" },
    { id: 7, text: "7 Days" },
]

export const SellTaxDecayData = [
    { id: 1, text: "Unitill halfqy throgh - 10%" },
    { id: 2, text: "Unitill halfqy throgh - 20%" },
    { id: 3, text: "Unitill halfqy throgh - 30%" },
    { id: 4, text: "Unitill halfqy throgh - 40%" },
    { id: 5, text: "Unitill halfqy throgh - 50%" },
    { id: 6, text: "Unitill halfqy throgh - 60%" },
    { id: 7, text: "Unitill halfqy throgh - 70%" },
    { id: 8, text: "Unitill halfqy throgh - 80%" },
    { id: 9, text: "Unitill halfqy throgh - 90%" },
    { id: 10, text: "Unitill halfqy throgh - 100%" },
]

export const FinalTokenPoolData = [
    { id: "pancakeswap", text: "PancakeSwap / BNB" },
    { id: "biswap", text: "Biswap / BNB" },
    { id: "apeswap", text: "ApeSwap / BNB" },
    { id: "babyswap", text: "BabySwap / BNB" },
]

export const AdminSocialData = [
    { id: "telegram", icon: <FaTelegramPlane />, url: "https://t.me/+06-Lw_0NTj05MmI8" },
    { id: "youtube", icon: <FaYoutube />, url: "https://www.youtube.com/channel/UCZbPYMqniu6-SpnyaJ1jf8Q" },
    { id: "twitter", icon: <FaTwitter />, url: "https://x.com/VAMPfunDAO" },
    { id: "redditAlien", icon: <FaRedditAlien />, url: "https://www.reddit.com/user/Asleep-Ad-238/" },
    { id: "mail", icon: <IoMdMail />, url: "vamp.fun.dao.gstr@gmail.com" },
]

export const FilterSelectList = [
    { id: "featured", text: "Featured", icon: <FeaturedIcon /> },
    { id: "lastTrade", text: "Last Trade", icon: <LastTradeIcon /> },
    { id: "creatTime", text: "Creating time", icon: <CreatTimeIcon /> },
    { id: "lastReply", text: "Last reply", icon: <LastReplyIcon /> },
    { id: "currentLive", text: "Currently live", icon: <CurrenLiveIcon /> },
    { id: "marketCap", text: "Market cap", icon: <MarketCapIcon /> },
]

export const FooterMenu = [
    { id: "tokens", text: "Tokens", path: "/" },
    { id: "creat-coin", text: "Launch Token", path: "/create-coin" },
]

export const FooterModalButton = [
    { id: "support", text: "Support" },
    { id: "contact", text: "Contact Us" },
    { id: "policy", text: "Privacy Policy" },
    { id: "service", text: "Terms of Service" },
]

export const TokenCreateMode = [
    { id: "bnb", text: "BNB", icon: <Image src={BnbImg} alt="BNB" width={20} height={20} /> },
    { id: "token", text: "Token", icon: <Image src={TokenImg} alt="Token" width={20} height={20} /> },
]

export const TokenList = [
    { id: "BNB", text: "BNB", Icon: BnbImg },
    { id: "GFOW", text: "GFOW", Icon: TokenImg },
]
