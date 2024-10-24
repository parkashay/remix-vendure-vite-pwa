import { NavLink, useMatches, useResolvedPath } from '@remix-run/react';
import { To } from '@remix-run/router';

type IconElement = React.RefAttributes<SVGSVGElement> & {
  title?: string;
  titleId?: string;
};

export type TabProps = {
  icon: React.FC<IconElement>;
  text: string;
  to: To;
};

export function Tab({ icon: Icon, text, to }: TabProps) {
  const resolved = useResolvedPath(to);
  const matches = useMatches();
  const isActive = matches.find((m) => m.pathname === resolved.pathname);

  return (
    <li className={isActive ? `cursor-default` : `cursor-pointer`}>
      <NavLink
        to={to}
        className={`group w-full gap-x-2 max-w-[12rem] inline-flex items-center justify-around p-4 rounded-t-lg border-b-2 ${
          isActive
            ? 'text-zinc-900 border-zinc-900'
            : 'border-transparent text-zinc-500 hover:text-zinc-600'
        }`}
      >
        <Icon
          // @ts-ignore
          className={`w-5 h-5 ${
            isActive
              ? 'text-zinc-900'
              : 'text-zinc-500 group-hover:text-zinc-600'
          }`}
        />
        <p className="flex-1">{text}</p>
      </NavLink>
    </li>
  );
}
