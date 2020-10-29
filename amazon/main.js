const carouselimg = ["https://images-eu.ssl-images-amazon.com/images/G/31/img20/CEPC/Jupiter/GW/Phase-2/Ele_acc_unrec_1242x550._CB417557368_SY367_FMwebp_.jpg",
"https://images-eu.ssl-images-amazon.com/images/G/31/img20/Fashion/EVENT/Jupiter_GW_Softlines/Phase_2/V2/Phase2Mobile_hero_updated1._CB417467768_SY367_FMwebp_.jpg",
"https://images-eu.ssl-images-amazon.com/images/G/31/img20/Wireless/SamsungM/Jupiter2020/Phase2/Family/Mobile_hero1._CB417371113_SY367_FMwebp_.jpg",
"https://images-eu.ssl-images-amazon.com/images/G/31/img20/Wireless/Jupiter2020/Xiaomi/Redmi_9A/Phase-2/V265973921_Jupiter2020_Phase2_Redmi9A_Mobile_hero._CB417372227_SY367_FMwebp_.jpg"]

function carousel_init ()
{
let slides = ses(".slider")[0].children
let nc = 0;
    for(let src of carouselimg)
    {
     slides[nc].style.backgroundImage = `url("${src}")`
     nc++
    }
}

carousel_init();













