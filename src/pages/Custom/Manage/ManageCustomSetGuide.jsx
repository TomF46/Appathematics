function ManageCustomSetGuide() {
    return (
        <div>
            <h1 className="text-4xl my-4 text-primary text-center">Guide</h1>
            <p className="text-center">The following is a detailed guide on how to use the custom question set creation form.</p>
            <div className="guide my-4">
                <p>1. <span className="font-bold">Name</span> This is the name that represents the custom set in set selection.</p>
                <p>2. <span className="font-bold">Number of questions</span> This is the number of randomly generated questions that will be included in each game.</p>
                <p>3. <span className="font-bold">Operators</span> This allows you to decide which operators are included and how often questions appear with that operators. For each operator you set a % chance out of 100 that any generated question will be that operator and all values must add up to 100% e.g. one operator may be 100% chance and all others zero, or 5 may have 20% chance and the other zero. Any mix is valid as long as it adds up to 100%.</p>
                <div className="mt-4">
                    <p>4. <span className="font-bold">Numbers</span> These are split into <span className="font-bold">Primary Numbers</span> and <span className="font-bold">Secondary Numbers</span>. Primary numbers are generall the number on the left of an equation and secondary numbers are generally the numbers on the right.</p>
                    <p className="mt-2">Multiplication: primary x secondary</p>
                    <p>Addition: primary + secondary</p>
                    <p>Subtraction: primary - secondary</p>
                    <p>Power: primary<sup>secondary</sup></p>
                    <p className="mt-2">However division and roots are slightly more complicated.</p>
                    <p className="mt-2">Division: The primary number is multiplied by the secondary number to get the number on the left which is then divided by the secondary number and the user has to enter the primary number as the answer.</p>
                    <p>e.g. primary: 10 secondary: 5 will display as 50&#xF7;5 so this answer will be 10.</p>
                    <p className="mt-2">Roots: The primary number is powered to the secondary number e.g. primary<sup>secondary</sup> The product of this will be displayed like this <sup>secondary</sup><span>&#8730;</span>product and the answer will be the primary number.</p>
                    <p>e.g. primary: 10 secondary: 3 will display as <sup>3</sup><span>&#8730;</span>1000 so this answer will be 10.</p>
                </div>
            </div>
        </div>
    );
}

export default ManageCustomSetGuide;
