import PropTypes from 'prop-types';

export const AuthLayout = ({ children }) => {
	return (
		<main className='w-full min-h-screen mx-auto flex items-center justify-center bg-slate-100 p-5'>
			<section className='w-full sm:w-[450px] h-full rounded-lg shadow-2xl mx-auto'>
				<article className='w-full h-full bg-white rounded-tl-lg rounded-bl-lg p-8'>
					<header className='w-full h-20'>
						<div className='flex items-center gap-2'>
							<img
								className='size-10'
								src='../../../favicon.svg'
								alt='logo'
							/>
							<h1 className='text-[#3584E4] font-bold text-lg uppercase'>
								StudyHive
							</h1>
						</div>
					</header>
					{children}
				</article>
			</section>
		</main>
	);
};

AuthLayout.propTypes = {
	children: PropTypes.node.isRequired,
};
