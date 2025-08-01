import { BiRupee } from 'react-icons/bi'
import { FaRegClock } from 'react-icons/fa'

const SubscriptionCard = ({heading, durationText, price, themeColor, planType, selectedPlan, setSelectedPlan}) => {
    return (
        <div className={`w-80 min-h-[26rem] flex flex-col justify-start shadow-[0_0_10px_black] rounded-lg cursor-pointer ${selectedPlan === planType ? `ring-2 ring-${themeColor}-500` : ''}`}
            onClick={() => setSelectedPlan(planType)}
        >
            <h1 className={`bg-${themeColor}-500 w-full text-center py-4 text-2xl font-bold rounded-tl-lg rounded-tr-lg`}>{heading}</h1>
            <div className="px-4 text-center mt-10">
                <div className={`flex items-center justify-center gap-2 text-${themeColor}-500 mb-5`}>
                    <FaRegClock size={24} />
                    <span className="text-xl font-bold">{durationText}</span>
                </div>
                <p className="text-[17px] mb-5">
                    This purchase will allow you to access all available courses
                    of our platform for {" "}
                    <span className={`text-${themeColor}-500 font-bold`}>
                        {durationText}
                    </span> {" "}
                    All the existing and new launched courses will be also available
                </p>

                <p className={`flex items-center justify-center gap-1 text-2xl font-bold text-${themeColor}-500 mb-5`}>
                    <BiRupee /><span>{price}</span> only
                </p>
                <div className="text-gray-200 mb-5">
                    <p>100% refund on cancellation</p>
                    <p>* Terms and conditions applied *</p>
                </div>
                <div className="h-12"></div> {/* Spacer for consistent card height */}
            </div>
        </div>
    )
}

export default SubscriptionCard