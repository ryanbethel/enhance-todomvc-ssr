import CustomElement from '@enhance/custom-element'
export default class FlashMessage extends CustomElement  {
  constructor(){
    super()
  }
  render({html,state}){
    return html`
      <style>
        .flash-conatiner {
          position:fixed;
            top: 10px;
            right: 10px;
            /* background-color: #f8d7da; */
            /* color: #721c24; */
            /* padding: 15px; */
            /* border-radius: 5px; */
            /* box-shadow: 0 0 10px rgba(0, 0, 0, 0.2); */
            /* z-index: 1000; */
        }
        .flash-message {
            position:relative;
            /* position: fixed; */
            top: 10px;
            right: 10px;
            background-color: #f8d7da;
            color: #721c24;
            padding: 15px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
            z-index: 1000;
        }

        input[type=checkbox] {
            position:absolute;
            opacity:0;
            top:-9999px;
            right:-9999px;
        }

        input:checked + .flash-message {
            display: none;
        }

        label {
            position: absolute;
            top: 0;
            right: 0;
            padding: 0 8px;
            cursor: pointer;
            font-size: 20px;
        }

        details {
            margin-top: 20px;
        }

      </style>
      <div class="flash-container">
        <input type="checkbox" id="dismiss-${state.instanceId}" />
        <div class="flash-message">
            <label for="dismiss-${state.instanceId}" >✖</label>
            <details open>
                <summary><slot name=summary>Create Failed</slot></summary>
                <p><slot name=details>Task was not created. There was no response from the server.</slot></p>
            </details>
        </div>
      </div>
`}
}
