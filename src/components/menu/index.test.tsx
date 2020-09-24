import React from 'react'
import { render, RenderResult } from '@testing-library/react'

import Menu, {MenuProps} from './index'
import MenuItem from './menuItem'

const testProps: MenuProps = {
    defaultIndex: 0,
    onSelect:jest.fn(),
    className:'test'
}

// const testVerProps: MenuProps = {
//     defaultIndex:0,
//     mode: 'vertical'
// }

const generateMenu = ( props:MenuProps ) => {
    return (
        <Menu {...props}>
            <MenuItem index={0}>ssss1</MenuItem>
            <MenuItem index={1} disabled>ssss2</MenuItem>
            <MenuItem index={2}>ssss3</MenuItem>
        </Menu>
    )
}
let wrapper:RenderResult, menuElement:HTMLElement, activeElement:HTMLElement, disabledElement:HTMLElement 
describe('test menu and menuItem component', ()=>{
    beforeEach(()=>{
        wrapper = render(generateMenu(testProps))
        menuElement = wrapper.getByTestId('test-menu')
        activeElement = wrapper.getByText('active')
        disabledElement = wrapper.getByText('disabled')
    })
    it('should render correct menu and menuItem based on default props', ()=>{
        expect(menuElement).toBeInTheDocument()
        expect(menuElement).toHaveClass('viking-menu test')
        expect(menuElement.getElementsByTagName('li').length).toEqual(3)
        expect(activeElement).toHaveClass('menu-item is-active')
        expect(disabledElement).toHaveClass('menu-item is-disabled')

    })
    it('click items should change active and call the right callback', ()=>{

    })
    it('should render vertical mode when mode is set to vertical', ()=>{

    })
})