'use client';
import { SidebarItemIconProps, SidebarSectionProps } from '@/lib/types';
import { cn } from '@/lib/utils';
import * as Icons from 'react-icons/ai';
import Link from 'next/link';
import { ReactElement } from 'react';
import clsx from 'clsx';

export const SidebarItemIcon = ({ iconName, library, isShowMargin }: SidebarItemIconProps): ReactElement | null => {
    const Icon = library[iconName];
    return Icon ? <Icon className={`text-xl ${isShowMargin ? 'mr-2' : ''}`} /> : null;
};

export const SidebarSection = ({ section, openSection, toggleSection, pathname }: SidebarSectionProps): ReactElement => {
    const isChildActive = section.items?.some(item => pathname === item.href);

    return (
        <li key={section.name} className="mb-2">
            {!section.items ? (
                <Link
                    href={section.href}
                    className={cn(
                        'flex items-center px-4 py-2 hover:bg-secondary rounded text-sm',
                        pathname === section.href && 'bg-secondary'
                    )}
                >
                    <SidebarItemIcon iconName={section.icon!} library={Icons} isShowMargin={true} />
                    {section.name}
                </Link>
            ) : (
                <div>
                    <div
                        className={clsx(
                            'flex items-center justify-between px-4 text-sm py-2 rounded cursor-pointer',
                            isChildActive && 'bg-secondary', 
                            'hover:bg-secondary'
                        )} onClick={() => toggleSection(section.name)}
                    >
                        <div className="flex items-center">
                            <SidebarItemIcon iconName={section.icon!} library={Icons} isShowMargin={true} />
                            {section.name}
                        </div>
                        <span className="text-xl">{openSection === section.name || isChildActive ? '-' : '+'}</span>
                    </div>
                    {openSection === section.name || isChildActive ? (
                        <ul className="flex gap-3 flex-col mt-4">
                            {section.items!.map((item, index) => (
                                <li key={item.name} className="relative text-sm">
                                    <div className="absolute bottom-0 left-8 top-[-12px] z-30 transform -translate-x-1/2 w-6 h-8 border-b-2 border-gray-400 rounded-bl-md"></div>
                                    {section.items!.length - 1 !== index && (
                                        <div className="absolute bottom-0 left-8 top-[6px] z-30 border-l-2 transform -translate-x-1/2 w-6 h-[59px] border-gray-400"></div>
                                    )}
                                    <Link
                                        href={item.href}
                                        className={cn(
                                            'flex items-center ml-[48px] px-4 py-2 hover:bg-secondary rounded',
                                            pathname === item.href && 'bg-secondary'
                                        )}
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    ) : null}
                </div>
            )}
        </li>
    );
};
