import React from 'react'

function Part() {
    return (
        <form>
            <fieldset>
                <legend>IDN: 04117922</legend>
                <select name="subassembly-select">
                    <option>Gearbox</option>
                    <option>Prop Shaft</option>
                    <option>Front Powertrain</option>
                    <option>Rear Powertrain</option>
                </select>

                {/* Note that this must be a self-closing tag due to React rules. 
                */}
                <input value="Intermediate Gear" />
                <select name="ordering-priority-select">
                    <option>Completed!</option>
                    <option>This Year</option>
                    <option>This Month</option>
                    <option>This Week</option>
                    <option>Yesterday!</option>
                </select>
                <div>
                    <legend>Quantity</legend>
                    <br></br>
                    <label>Go/NoGo<input type="number"/></label>
                    <label>Competition<input type="number"/></label>
                    <label>Available<input type="number"/></label>
                    
                </div>

            </fieldset>
        </form>
    );  
}

export default Part;


