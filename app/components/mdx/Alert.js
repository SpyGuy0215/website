export default function Alert({children, type = 'info'}) {
    let alertColor = '#f0f0f0';
    if (type === 'info') alertColor = '#e0f2fe';
    if (type === 'warning') alertColor = '#fef3c7';
    if (type === 'danger') alertColor = '#fee2e2';
    console.log('alertColor', alertColor)
    console.log('type', type)

    return (
        <>
            <div className={'my-5'}>
                {type === 'info' && (
                    <div className={'bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4'} role="alert">
                        <p className={'font-bold text-2xl mb-3'}>Info</p>
                        <div className={'text-black'}>
                            {children}
                        </div>
                    </div>
                )}
                {type === 'warning' && (
                    <div className={'bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4'} role="alert">
                        <p className={'font-bold text-2xl mb-3'}>Warning</p>
                        <div className={'text-black'}>
                            {children}
                        </div>
                    </div>
                )}
                {type === 'danger' && (
                    <div className={'bg-red-100 border-l-4 border-red-500 text-red-700 p-4'} role="alert">
                        <p className={'font-bold text-2xl mb-3'}>Danger</p>
                        <div className={'text-black'}>
                            {children}
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}