/*
How checkboxes are rendered:

- Each node renders:
  - its own checkbox
  - then recursively renders its children

This creates a tree UI.

Example:
Parent
 ├── Child 1
 ├── Child 2
      └── Subchild

Each level calls <Checkboxes /> again
Basically each component renders a level/layer of checkboxes
*/

import { memo, Fragment } from "react";

export const Checkboxes = memo(({ checkboxes, handleCheck, checked }) => {
	return (
		<div className="children-boxes">
			{checkboxes.map((checkbox) => {
				return (
					<Fragment key={checkbox.id}>
						<div className="checkbox">
							<input
								className="check"
								id={checkbox.id}
								type="checkbox"
								checked={checked[checkbox.id] || false}
								onChange={(e) => handleCheck(e.target.checked, checkbox)} // trigger both upward + downward updates
							/>
							<label htmlFor={checkbox.id}>{checkbox.name}</label>
						</div>
						{/*
              RECURSIVE UI:

              If current node has children, call same component again
              This keeps nesting deeper until no children exist
						*/}
						{checkbox.children?.length && (
							<Checkboxes
								checkboxes={checkbox.children}
								handleCheck={handleCheck}
								checked={checked}
							/>
						)}
					</Fragment>
				);
			})}
		</div>
	);
});
