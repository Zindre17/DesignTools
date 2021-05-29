<div>
    <h2>Contrast and Similarity</h2>

    <p>
        Contrast is what makes content consumable. If you write som white text
        on a white background, then that information is not very easily
        consumed. It can also be used to draw attention. Something that sticks
        out has high contrast, and contrast can therefor be used as a tool to
        direct the eyes of the user where we want. This is tightly connected to
        other design principles such as Hierarchy and Flow.
    </p>

    <p>
        On the other side we have similarity. Similiarity helps in grouping
        things together.
    </p>

    <p>
        What is common for both contrast and similarity is that they only work
        when there is something to compare with. This means that a highly
        saturated color does not stick out unless there are other less saturated
        colors also visible.
    </p>

    <p>Exampes of techniques to apply contrast and/or similiarity:</p>

    <div class="list-container">
        <ul>
            <li>
                <span class="fontface1">Font</span><span class="fontface2"
                    >face</span
                >
            </li>
            <li>
                <span class="fontstyle1">Font</span><span class="fontstyle2"
                    >style</span
                >
            </li>
            <li>
                <span class="fontweight1">Font</span><span class="fontweight2"
                    >weight</span
                >
            </li>
            <li><span>Si</span><span class="bigger">ze</span></li>
            <li>
                <span class="color1">Co</span><span class="color2">lor</span>
            </li>
            <li class="right">Alignment</li>
            <li class="animated">Motion</li>
        </ul>
    </div>
</div>

<style>
    h2 {
        font-size: 3em;
        font-weight: 100;
        color: var(--full-color);
    }
    p {
        padding: 0 20%;
        text-align: left;
        line-height: 1.5em;
    }
    ul {
        list-style: none;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        text-align: left;
        width: 30em;
    }

    .list-container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    li {
        font-size: 1.5em;
        line-height: 2em;
        width: 100%;
    }
    .fontface1 {
        font-family: "Fira Code" monospace;
    }
    .fontface2 {
        font-family: "Courier new";
    }
    .fontstyle1 {
        font-style: normal;
    }
    .fontstyle2 {
        font-style: italic;
    }
    .fontweight1 {
        font-weight: 100;
    }
    .fontweight2 {
        font-weight: bold;
    }

    .bigger {
        font-size: 2.1em;
    }
    .right {
        text-align: right;
    }
    .color1 {
        color: #c0d87d;
    }
    .color2 {
        color: #967dd8;
    }

    @keyframes horizontal {
        from {
            padding-left: 0px;
        }
        to {
            padding-left: 50px;
        }
    }
    .animated {
        animation-name: horizontal;
        animation-duration: 1s;
        animation-direction: alternate;
        animation-iteration-count: infinite;
    }
</style>
