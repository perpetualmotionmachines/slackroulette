import * as React from 'react';
import { BsPrefixComponent } from './helpers';

export interface FormGroupProps {
  innerRef?: React.LegacyRef<this>;
  controlId?: string;
}

declare class FormGroup<
  As extends React.ElementType = 'div'
> extends BsPrefixComponent<As, FormGroupProps> {}

export default FormGroup;
