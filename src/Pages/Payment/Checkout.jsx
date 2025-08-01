import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { BiRupee } from "react-icons/bi";
import { FaRegClock } from "react-icons/fa";

import HomeLayout from '../../Layouts/HomeLayout'
import { getRazorpayId, purchaseCourseBundle, verifyUserPayment } from '../../Redux/Slices/RazorpaySlice'
import { getUserData } from '../../Redux/Slices/AuthSlice';
import SubscriptionCard from './SubscriptionCard';

const Checkout = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const razorpayKey = useSelector(state => state.razorpay.key)
    const subscription_id = useSelector(state => state.razorpay.subscription_id)
    const userData = useSelector(state => state?.auth?.data)
    const paymentDetails = {
        razorpay_payment_id: "",
        razorpay_subscription_id: "",
        razorpay_signature: ""
    }

    const [isLoading, setIsLoading] = useState(false)
    const [selectedPlan, setSelectedPlan] = useState('yearly')

    const handleSubscription = async (e) => {
        e.preventDefault()
        if (!razorpayKey || !subscription_id) {
            toast.error("Something went wrong..!")
            return
        }
        
        // Get the price based on selected plan
        let price = 499; // default yearly price
        let duration = "1 Year";
        
        if (selectedPlan === 'monthly') {
            price = 99;
            duration = "1 Month";
        } else if (selectedPlan === 'halfYearly') {
            price = 299;
            duration = "6 Months";
        }
        const options = {
            key: razorpayKey,
            subscription_id: subscription_id,
            name: "CourseCracker Pvt. Ltd.",
            description: `${duration} Subscription`,
            theme: { color: '#F37254' },
            prefill: {
                email: userData.email,
                name: userData.name
            },
            handler: async function (response) {
                paymentDetails.razorpay_payment_id = response.razorpay_payment_id;
                paymentDetails.razorpay_subscription_id = response.razorpay_subscription_id;
                paymentDetails.razorpay_signature = response.razorpay_signature;

                const result = await dispatch(verifyUserPayment((paymentDetails)))
                const isSuccess = result?.payload?.success
                if(isSuccess){
                    dispatch(getUserData())
                    navigate('/checkout/success')
                } else {
                    navigate('/checkout/fail')
                }
            }
        }
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }

    const load = async () => {
        setIsLoading(true)
        await dispatch(getRazorpayId())
        await dispatch(purchaseCourseBundle())
        setIsLoading(false)
    }

    useEffect(() => {
        load()
    }, [])


    return (
        <HomeLayout>
            {!isLoading ? (
                <form
                    onSubmit={handleSubscription}
                    className="flex-1 py-20 sm:py-12 mx-3 sm:mx-16 flex flex-col items-center gap-10 text-white"
                >
                    <h1 className="text-3xl text-center font-bold mb-8">Choose Your Subscription Plan</h1>
                    
                    <div className="w-full flex flex-wrap gap-8 justify-center">
                        {/* 1 Month Subscription Card */}
                        <SubscriptionCard
                            heading="Basic Plan"
                            durationText="1 Month"
                            price={200}
                            themeColor="teal"
                            planType="monthly"
                            selectedPlan={selectedPlan}
                            setSelectedPlan={setSelectedPlan}
                        />

                        {/* 6 Month Subscription Card */}
                        <SubscriptionCard
                            heading="Standard Plan"
                            durationText="6 Months"
                            price={1000}
                            themeColor="blue"
                            planType="halfYearly"
                            selectedPlan={selectedPlan}
                            setSelectedPlan={setSelectedPlan}
                        />

                        {/* 1 Year Subscription Card */}
                        <SubscriptionCard
                            heading="Premium Plan"
                            durationText="1 Year"
                            price={2000}
                            themeColor="red"
                            planType="yearly"
                            selectedPlan={selectedPlan}
                            setSelectedPlan={setSelectedPlan}
                        />
                    </div>
                    
                    <button type="submit" className="text-black bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-300 text-xl font-bold rounded-lg py-3 px-10">
                        Buy Now {`(${
                            selectedPlan === 'monthly' ? 'Basic Plan' :
                            selectedPlan === 'halfYearly' ? 'Standard Plan' :
                            selectedPlan === 'yearly' ? 'Premium Plan' :
                            ''
                        })`}
                    </button>
                </form>
            ) : (
                <div className='flex-1 flex items-center justify-center text-white'>loading...</div>
            )}
        </HomeLayout>
    )
}

export default Checkout