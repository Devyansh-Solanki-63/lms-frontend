import React from 'react'
import Skeleton from 'react-loading-skeleton'

const HomePageSkeleton = () => {
    return (
        <div className='flex flex-col min-h-[100vh]'>
            <div className='flex-1 flex flex-col-reverse md:flex-row items-center justify-center gap-10 text-white pt-10 pb-10 md:pb-0 mx-3 sm:mx-16'>
                <div className='w-full md:w-1/2 space-y-6 text-center md:text-left'>
                    <Skeleton height={48} width={"100%"} style={{marginBottom: 24}} />

                    <Skeleton height={28} width={"100%"} style={{ marginBottom: 8 }} />
                    <Skeleton height={28} width={"100%"} style={{ marginBottom: 8 }} />

                    <div className='flex flex-wrap gap-[20px] justify-center md:justify-start mt-4'>
                        <Skeleton height={52} width={160} style={{ borderRadius: 8 }} />
                        <Skeleton height={52} width={160} style={{ borderRadius: 8 }} />
                    </div>
                </div>

                <div className='w-[70%] md:w-1/2 flex items-center justify-center'>
                    <Skeleton containerClassName='parent-skeleton' height={300} width={"100%"} style={{ borderRadius: 16 }} />
                </div>
            </div>
        </div>
    )
}

export default HomePageSkeleton