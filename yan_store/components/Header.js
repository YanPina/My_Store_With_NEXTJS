import Image from 'next/image';

function Header() {
    return (
        <header>
            {/* Top Nav */}
            <div className='flex items-center bg-amazon_blue p-1 flex-grow py-2'>
                <div className='mt-2 flex items-center flex-grow sm:flex-grow-0'>
                    <Image
                        src='/logo.png'
                        width={150}
                        height={40}
                        objectFit='contain'
                        className='cursor-pointer'
                    />
                </div>
            </div>

            {/* Bottom Nav */}
        </header>
    );
}

export default Header;
