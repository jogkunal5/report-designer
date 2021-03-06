// @flow
import * as React from 'react';

type Props = {
  properties: ?{}
};

const AvailableProperties = {
  color: import('./Properties/Color.js'),
  alignment: import('./Properties/Alignment.js'),
  size: import('./Properties/Size.js'),
  location: import('./Properties/Location.js')
};

type PropertiesWrapperTypes = {
  children?: React.Node
};

const PropertiesWrapper = ({ children }: PropertiesWrapperTypes) => (
  <div className="bg-grey-lightest shadow p-5 w-1/3">{children}</div>
);

PropertiesWrapper.defaultProps = {
  children: null
};

const Properties = ({ properties }: Props) => {
  if (!properties) return <PropertiesWrapper />;
  return (
    <PropertiesWrapper>
      <React.Suspense fallback={<div>Loading...</div>}>
        {Object.keys(properties).map(propertyName => {
          if (!Object.prototype.hasOwnProperty.call(AvailableProperties, propertyName)) {
            return null;
          }
          const DynamicProperty = React.lazy(() => AvailableProperties[propertyName]);
          return <DynamicProperty key={propertyName} {...properties[propertyName]} />;
        })}
      </React.Suspense>
    </PropertiesWrapper>
  );
};

export default Properties;
