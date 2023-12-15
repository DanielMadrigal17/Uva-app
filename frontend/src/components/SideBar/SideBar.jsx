import React from 'react'
import { useNavigate } from 'react-router-dom';
import uvaAlone from '../../assets/img/uvaAlone.png';
import "./SideBar.css"


function SideBar() {

    const navigation = useNavigate()

    function logoutHome () {
        navigation('/');
    }

return (
    <div>
        <div className="area"></div><nav className="main-menu">
            <ul>
                <li className='liLogo'>
                    <a className='logo' href="./principal">
                    <img className='uvaAlone' src={uvaAlone} alt='uva logo'></img>
                        <span className="nav-text1">

                        </span>
                    </a>
                </li>
            
                <li className="has-subnav">
                    <a className='aIcons' href="./Inventorie">
                    <img className='IconNav' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAs
                    TAAALEwEAmpwYAAACNklEQVR4nO2YPYgTQRSAnyAe2FidVhYW1wiWJs11YuIPZBG5E+RgZjk4sDgwjXpk3q2Nepm3J1
                    pIIhwW5sDG7jq5RhEEO1srMf6V2mghOjKZJUTI6pLdu70H88FrNmHefHnzJjML4PF4PJ6ikUhGIH2VqJ+EK7em//Vd0
                    4FzpgN90wVTaHSgbx7C2YkFhqH09n8Eip98dxjvJxIYSKj2jKsCmYUWHUsVyDCRxxKMvvB39MJsEpAHofSzZDmdzyPQ
                    GyOwKXdBQCq9YQXClr6SRyBPQE6ByFVA32YpEK5SmDTyJksBgfGpQQUUvWApIFV7JllC71gKLC/fn5KofwtFP6Mo2s9
                    OwCJQfxn0QSs+CiwFlH7tttJ4dtznr66B2cmAvEhFT5Od6DJLAYH6btLIN1guoVBR022l+gFLAYH6YnIe2mJ3mLNIpJ
                    OuB+gNjGFPH+Ysiyv3jiRN/A04LiEAs0+i/m4llq6vHWIoACCQ3roqrJ9gKSCV3k672LAQEEo/SrvY8BBAupl2sdmzl
                    /pRxCotpl1s7KsPm2gnJm+6cAaKQGJ8OvkveDmc+PMps9sBk7IQ0WGh6JdU9CNEqrITsAik3ugLL3YCS1F0UKKOhaI+
                    S4E0js/NHajWGu1qrfGpUg8+VuqNNfsMSh4rMzZJtR6Y0bDPyh4rM/bXsokuNdHMN9ElrgWfyx4rM7bUNpFNOH/VJa3
                    Ugg9lj5Wz7MGdssfKjG0ym9g1Xf4mrhQ0lsfj8XggC38ARlEhEqFwuEEAAAAASUVORK5CYII=" alt='Inventario'/>
                        <span className="nav-text">
                            Inventario
                        </span>
                    </a>
                    
                </li>
                <li className="has-subnav">
                    <a className='aIcons' href="./food_expenses"> 
                    <img className='IconNav' src="https://img.icons8.com/papercut/60/ingredients.png" alt="ingredients"/>                    
                    <span className="nav-text">
                            Gastos Semanales
                        </span>
                    </a>
                </li>
                <li className="has-subnav">
                    <a className='aIcons' href="./branch_offices">
                    <img className='IconNav' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAs
                    TAAALEwEAmpwYAAACz0lEQVR4nO2Zz2sTQRTHv3oQpfUmCNENEaoFj14UM7NbqwGr/4FXb3rxJhTxoIdsL9kKItKTBx
                    EMhUrrTVGPJme1YvHS7upBI/6kGxSf7Jpou9lkd2Znkyj7hXfZ7Mz7fibz3g4MkClTJmERwwnimCOOl8TwtRXL/jOG4
                    0ig3FVb00x7Xivbn73Il+2Fwow9rsa4jv3E8YQ4KCIek4ExGfP5stPImw4F4oP3WzLzRTDiaMQw346GN0Ykh2ba8yHm
                    21GVN8+xjxjeCZj/CyHwT2jelukCoJn2J3kAhkcd5hjuEYNBJYz4UcQEcSyGQDxUA+B8lDPPMRli/mIP2OmO94uYiJM
                    rX7YXum6hsnNXDoDhZnDlI8dwLAUgbsTJVZixx72CDQF4v8dc2ysLsBwAMCLH6DgWAHgu1IlMp+rteS+8lZc23wL4ss
                    mMgdHIMUexMwAgX4BJRQzrCgC+YVAijteiBRlS+M9Eclaeuqdn603bqjfXrLo7lRSgGjCzGDmG4b5MEbflGZ+tN8mPW
                    nMVSUQ6zoS00emu73NcCnm/ODiAEkY6Cvl3LPndxsCoH9626Vx5z/wrAraIAbhTPkStuXqttn4yEYAPwXBL4hjRjguJ
                    DSQVMRwghh/C5hne0BHswDCIGG5LAJyTyVVR2YX+ABgYIwZXwPwLOohtMrkslUW8CYLhisA/MCmbx0oNwMB2YliJYf5
                    OkjyW6i60UaSD9yxor3AN7MIwixgudwH4STpODdoforoAAVuJ40HI6l+PO1evHJWkXShOEdFh7CaGtxvMr4SdVLvN1S
                    uHlbSI405AOkrE8L115D4kMlfKAG7sLkAc54njrOhcvXJYaXahTP1QJY2zSD9lpfUp75esfx/AzbrAUN4PpK2cqvsB0
                    fOLqueaqvsB0c+/queaqvuB4QRw4t8PiJ5fVD3Pp3E/0E8V0rgf6Ldyqu8HMmX6z/ULLjm5Nr+STYAAAAAASUVORK5C
                    YII=" alt='Sede'/>
                        <span className="nav-text">
                            Sedes y Contactos
                        </span>
                    </a>
                </li>
                <li>
                    <a className='aIcons' href="./list_assistance">
                    <img className='IconNav' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAs
                    TAAALEwEAmpwYAAAEhElEQVR4nO2YX2gcRRzHNykaSyv4IhoFY4NIFKxJc7YhFqpV2b3bmd3c3c5e2of0QTkaTEuRgr
                    v54yWmQelDsbZQUdFS0Jo+mF6b7l7AJLaPIvjSB5GCFlRqlcQm2dtc/o3M5i4m19vb2b0tHnI/+MJyt7/vfD87c7PcM
                    EylKlUpqsK6IGANTmINzmU1iTUAGY81NhjqPd0ZnH5nH4cT+zh8qjM4NfZuUGXuRWEdvod1iAtKA0Nu/YbfDl5TEYcL
                    aVgNTvocXhBsw+eUgoDW73J/cKBbLhxeRRwm340OhHr9AyBLxQlAAxPFPBKJRLWC2IOqxH7XLXMrduHVrPrauSUFsT8
                    oiDsajzffVyIAmHUE0MFMMQ9VYs9mw/198xxvOPndPg/mFMT+SnoUxGoIoU33GADesevvRiyfe7IK4o7T+ikSd2TdrL
                    xeCsAExQyM2/UrEje8BiCzr1ItSR2Mq4h7dg1AYq96B0hB4DygwNsCIPaXXJCeSKiObL00foc4rkaR2OXVXnaeYZgq7
                    xA6PGb/A4aDxXoVxBo5gARC91t+Ghii8VMl9s+1XlF8yDPAvzMBxq01bK1jMF7syVP5aWAi6zVTqt//txKYqX7zk1e+
                    ZE/snt15bNdKY38zJiLX7IkXZzs/3fsFuceN50I0eth8IfpjuhZljM2xFeMBGRuPyBmzCf00H4oe9S38ZyNia1dSnOG
                    +Anj36T048H4LbhwI4Mb+gHVNPuOGAe5Kinc+12CLk595QHzS3B79zWBiuJjMBumWCdFTJYUngTouiktgpA3TqGNEXD
                    o3Kuyy80vvj9Sln0Bpp/BGVulaZJp8pN5TeLIkDieFadrwOR252DZl5znfJP1MG97IzcRz6KYngDNJqLoNn9OZS+Jda
                    zgjh9uNKnfhjawyvNThGqA3Kd7wCtCXFG7k+5k7petewhtkFgLSddcAZIfZ3rcDE9EGz91PevP9rN3GI0C6FpG3sLt6
                    vr8ZewUgW2y+n1HjLbxBVBO7y8+x1r/aaQHW99j6JSE2qumCL38s2vr9ZwDLH4jUT36pJ1x+AIuHwtQAC/sj5QeQ4aP
                    UAPOt0fIDMBsQ/e7zmFxmABrExmYXu09VDOMRoXwAyK7idgtdPil6BCB/+zTwO2neE75CpWz421gXUCG/xbfaptwCLH
                    SFZwr5UUJwD2MdXKAHABdIj51feiv60C3A3JbYR0yplR+0lf/aUv7nTj4GE0u5fxPL3/gO0PTSWUvuAeRbHgD+8B2gI
                    XDKkocZiBtMbNoFwDTp8R2g7pkhS24BSGEGbV04EL6UeTmKzW0Ipx+UsbFpVeTarEc4s1fCi/HIt+TeksNbg+rg4IZz
                    m/NPr2rjWc5Jar8rIObol4JdvoS3BtSEdmcA0EPtN8rXO/qN8c3+AaQg5zigDt6g9sNMFdbAX/Z+II2/j5d2pL5hQA2
                    2OAMIgkvPlK2fBq/5Ft4aLAUaHAGKHKfYAAwWATjuL8Bo6FHnNQu3ufLUoWjrlwJRfwE0rsYZ4LUt7gDCtbZ+l/nHfQ
                    WoVKUqxZR1/QPjRjLGmJhHPQAAAABJRU5ErkJggg==" alt='Niños'/>
                        <span className="nav-text">
                            Asistencia de niños
                        </span>
                    </a>
                </li>

                <li className="has-subnav">
                    <a className='aIcons' href="./orders">
                    <img className='IconNav' src="data:image/png;base64,iVBORw0KGgoAAAANSU
                    hEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAC0ElEQVR4nO2Z
                    PW/TUBSG/RfCAAvNkERC6goVH6qlwkA3JJCA9g7uBmzwAwiFhTYrA0lMGqgESmxVomIrI6
                    WCBZZG2WhxmtaRUCNShnZJD7oX7AYrDnZjxyf2PdKr2L6xpffxe04+LAi8ePHqrNul+ghR
                    9aVpZWePqDpg0y1F354oaJ/G89ovMa/tibL29lKhfkbw0Pxu0CZ7mRflWlOUa2BRUyzWR/
                    oGQFR9KWiTvUTvfBfzhtS+AUwjjb0hFnt7AC0vEgCY1cM809AB2D2dYkINIP7k6z+yO273
                    Pquk0hYo0iPYHD1vAtgYvQBlaZathR5AWZo1jVtF19ABIB6L3m1q9mHmvXksnVkxkxAZAO
                    nMiutzUbRA3KHctIDTGdC3QQwApNIWM2skwc0MCAQAGYCczoBQANjoMgPS8xECUO7xMVia
                    eRx+AFKXGYB6CBJEX4VDB4C41FAAuLNQheyDbLgAQCXhSNR85dxVFuvc/efRAnC4loD1sU
                    lmvnr2CtxbqEQHwOFaAn6Op3w1jwbAQSYJ7Y9H+3TbME/jT9vAD/MoABzMJ5lRapga7zRP
                    X/00jwJA22K4c5uudTv3uD+aUAIAS78z8xeT0F79sxYJAPA3Ca3LKabOeeBn/FEBABtxAG
                    pIW4D0ocgDIC6BPXv9EiAX81b5EzcDSwBxobtKFVpyynsA2dgPeHHyFGoA199sQ77w1Hvz
                    R1pGC2BK0WGm+NlP885agRxjiHnxd/m1xW/wXR7zH8D/WoEEAGAA0XfeCiSA6E8UatCcEx
                    xrR290lZtroAEw+arOnumhBhD3sQWMh5ocwBziBBAfNRQJIAMA4GaK2wFwcw10MwA4gBje
                    BBCELdDQqrD/bgr2l29AY3M9WgCaXxahXUya+3SbHosMAPBAHIBdEZ4AnbcA4TNAj+4QDK
                    o4gBxPAPAWyPEZANEdgtnY6gAT8CFov7x4CXjqN5SnhI505RnGAAAAAElFTkSuQmCC" 
                    alt='Order'/>
                        <span className="nav-text">
                            Pedidos
                        </span>
                    </a>
                    
                </li>
            </ul>

            <ul className="logout">
                <li>
                    <a className='aIcons' href="/">
                        <i className="fa fa-power-off fa-2x"></i>
                        <span onClick={logoutHome} className="nav-text2">
                            Logout
                        </span>
                    </a>
                </li>  
                <li>
                </li>
            </ul>
        </nav>
    </div>
)
}

export default SideBar

