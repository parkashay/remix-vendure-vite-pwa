import { ReactNode } from 'react';
import { Tab, TabProps } from './Tab';

export function TabsContainer({
  tabs,
  children,
}: {
  tabs: TabProps[];
  children: ReactNode | string;
}) {
  return (
    <>
      <div className="border-b border-zinc-200 mt-4">
        <ul className="gap-x-4 grid grid-cols-2 sm:grid-0 sm:flex sm:flex-wrap -mb-px text-sm font-medium text-center">
          {tabs.map((props) => (
            <Tab
              icon={props.icon}
              text={props.text}
              to={props.to}
              key={props.text}
            />
          ))}
        </ul>
      </div>
      {children}
    </>
  );
}
