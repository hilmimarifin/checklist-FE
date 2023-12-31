import React, { FC } from "react";
import { useNavigate } from 'react-router-dom';


interface MainLayoutAttributes {
	children: React.ReactNode
}

const MainLayout: FC<MainLayoutAttributes> = ({ children }) => {
	const navigate = useNavigate();
	return (
		<div className=" w-full min-h-screen">
			<div className="fixed flex items-center inset-x-0 top-0 h-20 bg-primary-first">
				<div className="flex items-center  justify-between container">
					<a href="/">
						<img src="#" alt="logo" className=" h-10 w-auto" />
					</a>
					<nav>
						<ul className=" flex gap-x-5">
							<li>
								<div onClick={() => navigate("/auth/login")} className=" cursor-pointer text-menu-label transition-all hover:text-white">
									<span>Login</span>
								</div>
							</li>
							<li>
								<div onClick={() => navigate("/auth/register")} className=" cursor-pointer text-menu-label transition-all hover:text-white">
									<span>Register</span>
								</div>
							</li>
						</ul>
					</nav>
				</div>
			</div>
			<main className="pt-20">
				{children}
			</main>
		</div>
	);
};

export default MainLayout;