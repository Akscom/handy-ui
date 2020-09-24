```jsx
<Transition
    in={menuOpen}
    timeout={300}
    animation="zoom-in-top"
    >
    <ul className={subMenuClasses}>
        {childrenComponent}
    </ul>
</Transition>
```